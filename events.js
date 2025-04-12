var events = {
    timeline: null,

    data: Array.from({ length: 100 }, (_, i) => {
        const randomBU = BUs[Math.floor(Math.random() * BUs.length)];
        const randomEType = eTypes[Math.floor(Math.random() * eTypes.length)];
        const randomStart = new Date(
            new Date("2025-01-01").getTime() +
            Math.random() * (new Date("2025-12-31").getTime() - new Date("2025-01-01").getTime())
        );

        // Ensure 95% of events have a duration shorter than 4 hours
        const isShortEvent = Math.random() < 0.95;
        const randomDuration = isShortEvent
            ? 0.5 * Math.ceil(Math.random() * (4 / 0.5)) // Duration between 0.5 and 4 hours
            : 0.5 * Math.ceil(Math.random() * (2160 / 0.5)); // Duration between 0.5 and 2160 hours

        const randomEnd = new Date(randomStart.getTime() + randomDuration * 60 * 60 * 1000);

        return {
            name: `Event${i + 1}`,
            desc: `Description of Event${i + 1}`,
            BU: randomBU,
            eType: randomEType,
            start: randomStart,
            duration: randomDuration,
            end: randomEnd,
        };
    }),
};
events.render = function() {
    ctx.save();
    for (let i = 0; i < this.length; i++) {
        const event = this[i];
        ctx.fillStyle = event.color;
        ctx.fillRect(event.x, event.y, event.width, event.height);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(event.x, event.y, event.width, event.height);
    }
    ctx.restore();
}