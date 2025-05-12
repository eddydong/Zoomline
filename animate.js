var animations = [];

function anim(object, property, startValue, endValue, duration) {
    const startTime = performance.now();

    // Add the animation to the list of active animations
    animations.push({
        object,
        property,
        startValue,
        endValue,
        duration,
        startTime,
    });
}

// Function to update animations every frame
function updateAnimations() {
    const currentTime = performance.now();

    animations = animations.filter((animation) => {
        const elapsedTime = currentTime - animation.startTime;
        const progress = Math.min(elapsedTime / animation.duration, 1); // Clamp progress to [0, 1]

        // Apply easing-out effect (cubic easing-out formula)
        const easedProgress = 1 - Math.pow(1 - progress, 3);

        // Interpolate the value using eased progress
        const newValue = animation.startValue + (animation.endValue - animation.startValue) * easedProgress;

        // Update the object's property
        animation.object[animation.property] = newValue;
        timeline.update();

        // Remove the animation if it's complete
        return progress < 1;
    });
}