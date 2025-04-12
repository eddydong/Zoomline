var control = {
    panningSpeed : 1,
    zoomSpeed : 0.002,
    pinchZoomSpeed : 0.02, 
    zoomMaxX : 5,
    zoomMinX : 0.05,
    zoomMaxY : 3,
    zoomMinY : 0.05,
    init : function() {
        window.onresize = function() {
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
            if (event.deltaMode === 1) { // DOM_DELTA_LINE
                deltaX *= 20;
                deltaY *= 20;
            } else if (event.deltaMode === 2) { // DOM_DELTA_PAGE
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
                var tL = Math.min(timeline.maxTR-timeline.tW, Math.max(newTL, timeline.minTL));
                if (!isNaN(new Date(tL).getTime()) && Math.abs(deltaX) > 0.05) {
                    timeline.tL = tL;
                    timeline.update();
                }
            }
        });        
    }
}