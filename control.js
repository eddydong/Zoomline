var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d', { willReadFrequently: true });

var control = {
    panningSpeed : 1,
    zoomSpeed : 0.002,
    pinchZoomSpeed : 0.02, 
    zoomMaxX : 5,
    zoomMinX : 0.05,
    zoomMaxY : 3,
    zoomMinY : 0.05,
}

canvas.getPixelRGBA = function(x, y) {
    const imageData = ctx.getImageData(x, y, 1, 1);
    return {
        r: imageData.data[0],
        g: imageData.data[1],
        b: imageData.data[2],
        a: imageData.data[3]
    };
}

window.onresize = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    timeline.init();
}

let isZooming = false; // Flag to track zooming
let zoomTimeout; // Timeout to reset the zooming flag

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

    function zoom(type) {
        const mouseX = event.clientX - leftBar.width; // Get mouse X position relative to the timeline
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
            timeline.tW = newTW;
            timeline.update();
        }
    }

    if (event.shiftKey) { 
        isZooming = true; // Set zooming flag
        clearTimeout(zoomTimeout); // Clear any existing timeout
        zoom('shift');
        zoomTimeout = setTimeout(() => isZooming = false, 100); // Reset zooming flag after 100ms
    } else if (event.ctrlKey) { 
        isZooming = true; // Set zooming flag
        clearTimeout(zoomTimeout); // Clear any existing timeout
        zoom('pinch');
        zoomTimeout = setTimeout(() => isZooming = false, 100); // Reset zooming flag after 100ms
    } else if (!isZooming) { // Only pan if not zooming
        if (Math.abs(deltaX) > 0.1) { // Ignore small residual deltaX values
            timeline.tL += deltaX * timeline.mspp * control.panningSpeed;
            timeline.update();
        }
    }
});

