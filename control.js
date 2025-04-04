var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d', { willReadFrequently: true });

var control = {
    panningSpeed : 1,
    zoomSpeed : 0.005,
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
}

window.onload = function() {

}

canvas.addEventListener('wheel', (event) => {
    event.preventDefault();

    function applyLimit(){
        // Calculate the total grid size in pixels
        const gridWidthPx = grid.cols * grid.cellWidth * grid.scaleX;
        const gridHeightPx = grid.rows * grid.cellHeight * grid.scaleY;
        
        // Calculate the maximum allowed offsets
        const minOffsetX = Math.min(0, canvas.width - gridWidthPx) + leftBar.width;
        const maxOffsetX = leftBar.width;
        const minOffsetY = Math.min(0, canvas.height - gridHeightPx) + topBar.height;
        const maxOffsetY = topBar.height;
        
        // Apply the limits
        grid.offsetX = Math.max(minOffsetX, Math.min(maxOffsetX, grid.offsetX));
        grid.offsetY = Math.max(minOffsetY, Math.min(maxOffsetY, grid.offsetY));        
    }

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

    if (event.shiftKey) { // Zooming - browsers send pinch gestures as ctrl+wheel events
        // For pinch-to-zoom, browsers primarily use deltaY
        // We need to apply this to both dimensions while keeping them separate
        let zoomFactorX, zoomFactorY;
        
        zoomFactorX = 1 - deltaX * control.zoomSpeed;
        zoomFactorY = 1 - deltaY * control.zoomSpeed;
        
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const worldX = (mouseX - grid.offsetX) / grid.scaleX;
        const worldY = (mouseY - grid.offsetY) / grid.scaleY;
        const newScaleX = Math.min(Math.max(grid.scaleX * zoomFactorX, Math.max(control.zoomMinX,
            (canvas.width-leftBar.width)/(grid.cellWidth * grid.cols))), control.zoomMaxX);
        const newScaleY = Math.min(Math.max(grid.scaleY * zoomFactorY, Math.max(control.zoomMinY,
            (canvas.height-topBar.height)/(grid.cellHeight * grid.rows))), control.zoomMaxY);
        grid.offsetX = mouseX - worldX * newScaleX;
        grid.offsetY = mouseY - worldY * newScaleY;
        grid.scaleX = newScaleX;
        grid.scaleY = newScaleY;
    } else if (event.ctrlKey) { // Zooming - browsers send pinch gestures as ctrl+wheel events
            // For pinch-to-zoom, browsers primarily use deltaY
            // We need to apply this to both dimensions while keeping them separate
            let zoomFactorX, zoomFactorY;
            
            zoomFactorX = 1 - deltaY * control.pinchZoomSpeed;
            zoomFactorY = 1 - deltaY * control.pinchZoomSpeed;
            
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            const worldX = (mouseX - grid.offsetX) / grid.scaleX;
            const worldY = (mouseY - grid.offsetY) / grid.scaleY;
            const newScaleX = Math.min(Math.max(grid.scaleX * zoomFactorX, Math.max(control.zoomMinX,
                (canvas.width-leftBar.width)/(grid.cellWidth * grid.cols))), control.zoomMaxX);
            const newScaleY = Math.min(Math.max(grid.scaleY * zoomFactorY, Math.max(control.zoomMinY,
                (canvas.height-topBar.height)/(grid.cellHeight * grid.rows))), control.zoomMaxY);
            grid.offsetX = mouseX - worldX * newScaleX;
            grid.offsetY = mouseY - worldY * newScaleY;
            grid.scaleX = newScaleX;
            grid.scaleY = newScaleY;
    } else { // panning
        grid.offsetX -= control.panningSpeed * deltaX;
        grid.offsetY -= control.panningSpeed * deltaY;
        // grid.velocityX = -deltaX * control.panningSpeed;
        // grid.velocityY = -deltaY * control.panningSpeed;
    }
    applyLimit();
});

