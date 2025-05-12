var control = {
    panningSpeed: 1,
    zoomSpeed: 0.002,
    pinchZoomSpeed: 0.02,
    zoomMaxX: 5,
    zoomMinX: 0.05,
    zoomMaxY: 3,
    zoomMinY: 0.05,
    animationDuration: 500,
    currentLOD: { granularity: 'month', step: 1 }, // Default LOD is 'month'

    init: function () {
        window.onresize = function () {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            timeline.resize();
        };
        window.onresize();

        canvas.addEventListener('wheel', (event) => {
            event.preventDefault();

            // Handle different delta modes
            let deltaX = event.deltaX;
            let deltaY = event.deltaY;
            if (event.deltaMode === 1) {
                // DOM_DELTA_LINE
                deltaX *= 20;
                deltaY *= 20;
            } else if (event.deltaMode === 2) {
                // DOM_DELTA_PAGE
                deltaX *= window.innerWidth;
                deltaY *= window.innerHeight;
            }

            const mouseX = event.clientX - events.leftBar.width; // Get mouse X position relative to the timeline
            const mouseY = event.clientY - timeline.topBar.height; // Get mouse Y position relative to the timeline

            function zoom(type) {
                const mouseTime = timeline.tL + mouseX * timeline.mspp; // Map mouse X to actual time on the timeline
                let zoomFactorX;
                switch (type) {
                    case 'shift':
                        zoomFactorX = 1 + deltaX * control.zoomSpeed;
                        break;
                    case 'pinch':
                        zoomFactorX = 1 + deltaY * control.pinchZoomSpeed;
                        break;
                }
                let newTW = timeline.tW * zoomFactorX;
                newTW = Math.max(timeline.minTW, Math.min(newTW, timeline.maxTW)); // Clamp the zoom level
                if (newTW !== timeline.tW) {
                    timeline.tL = mouseTime - (mouseTime - timeline.tL) * (newTW / timeline.tW);
                    if (timeline.tL < timeline.minTL) {
                        timeline.tL = timeline.minTL;
                    }
                    if (timeline.tL > timeline.maxTR - newTW) {
                        timeline.tL = timeline.maxTR - newTW;
                    }
                    timeline.tW = newTW;
                    timeline.update();
                }
            }

            if (event.shiftKey) {
                zoom('shift');
                events.zoom(deltaY, mouseY);
            } else if (event.ctrlKey) {
                zoom('pinch');
                events.zoom(deltaY, mouseY);
            } else {
                events.pan(deltaY);
                var delta = deltaX * timeline.mspp * control.panningSpeed;
                var newTL = timeline.tL + delta;
                var tL = Math.min(timeline.maxTR - timeline.tW, Math.max(newTL, timeline.minTL));
                if (!isNaN(new Date(tL).getTime()) && Math.abs(deltaX) > 0.05) {
                    timeline.tL = tL;
                    timeline.update();
                }
            }
        });

        // Add keyboard event listener
        window.addEventListener('keydown', (event) => {
            if (event.key === 'm') {
                // Set LOD to 'month'
                control.currentLOD = { granularity: 'month', step: 1 };

                const currentTime = Date.now();
                const monthStart = dt.floorDT(currentTime, 'month', 1).getTime();
                const monthDuration = dt.getDuration(monthStart, 'month', 1);

                const newTW = monthDuration;
                const newTL = monthStart;

                anim(timeline, 'tW', timeline.tW, newTW, control.animationDuration);
                anim(timeline, 'tL', timeline.tL, newTL, control.animationDuration);
            }

            if (event.key === 'q') {
                // Set LOD to 'quarter'
                control.currentLOD = { granularity: 'month', step: 3 };

                const currentTime = Date.now();
                const quarterStart = dt.floorDT(currentTime, 'month', 3).getTime();
                const quarterDuration = dt.getDuration(quarterStart, 'month', 3);

                const newTW = quarterDuration;
                const newTL = quarterStart;

                anim(timeline, 'tW', timeline.tW, newTW, control.animationDuration);
                anim(timeline, 'tL', timeline.tL, newTL, control.animationDuration);
            }

            if (event.key === 'ArrowLeft') {
                // Move the timeline to the previous LOD duration
                const lodDuration = dt.getDuration(timeline.tL, control.currentLOD.granularity, control.currentLOD.step);

                // Align the beginning of the previous LOD at the left edge of the viewport
                const newTL = dt.addDuration(timeline.tL, control.currentLOD.granularity, -control.currentLOD.step).getTime();

                if (newTL >= timeline.minTL) {
                    anim(timeline, 'tL', timeline.tL, newTL, control.animationDuration);
                    anim(timeline, 'tW', timeline.tW, lodDuration, control.animationDuration);
                }
            }

            if (event.key === 'ArrowRight') {
                // Move the timeline to the next LOD duration
                const lodDuration = dt.getDuration(timeline.tL, control.currentLOD.granularity, control.currentLOD.step);

                // Align the beginning of the next LOD at the left edge of the viewport
                const newTL = dt.addDuration(timeline.tL, control.currentLOD.granularity, control.currentLOD.step).getTime();

                if (newTL + lodDuration <= timeline.maxTR) {
                    anim(timeline, 'tL', timeline.tL, newTL, control.animationDuration);
                    anim(timeline, 'tW', timeline.tW, lodDuration, control.animationDuration);
                }
            }

            if (event.key === 'ArrowUp') {
                // Move up the LOD list
                const currentLODIndex = lod.findIndex(
                    (lodItem) =>
                        lodItem.granularity === control.currentLOD.granularity &&
                        lodItem.step === control.currentLOD.step
                );

                if (currentLODIndex > 0) {
                    const newLOD = lod[currentLODIndex - 1];
                    control.currentLOD = { granularity: newLOD.granularity, step: newLOD.step };

                    // Adjust the timeline to fit the new LOD
                    const lodDuration = dt.getDuration(timeline.tL, newLOD.granularity, newLOD.step);
                    anim(timeline, 'tW', timeline.tW, lodDuration, control.animationDuration);
                }
            }

            if (event.key === 'ArrowDown') {
                // Move down the LOD list
                const currentLODIndex = lod.findIndex(
                    (lodItem) =>
                        lodItem.granularity === control.currentLOD.granularity &&
                        lodItem.step === control.currentLOD.step
                );

                // Ensure we are not at the last LOD
                if (currentLODIndex < lod.length - 1) {
                    const newLOD = lod[currentLODIndex + 1];
                    control.currentLOD = { granularity: newLOD.granularity, step: newLOD.step };

                    // Adjust the timeline to fit the new LOD
                    const lodDuration = dt.getDuration(timeline.tL, newLOD.granularity, newLOD.step);
                    anim(timeline, 'tW', timeline.tW, lodDuration, control.animationDuration);
                }
            }

            if (event.key === 'Escape') {
                // Reset zoom and pan
                anim(timeline, 'tL', timeline.tL, timeline.minTL, control.animationDuration);
                anim(timeline, 'tW', timeline.tW, timeline.maxTR - timeline.minTL, control.animationDuration);
            }

            if (event.key === ' ') {
                // Center the timeline on the current time
                const currentTime = Date.now();
                const newTL = currentTime - timeline.tW / 2;

                if (newTL >= timeline.minTL && newTL <= timeline.maxTR - timeline.tW) {
                    anim(timeline, 'tL', timeline.tL, newTL, control.animationDuration);
                }
            }
        });
    },
};