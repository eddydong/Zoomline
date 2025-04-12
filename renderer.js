var view = {
    font: "Zoomline",
    fontSize: 14,
    showStatus : true,
    scaleX: 1, // Default scaleX value
    labelW: 100,
}

var fps = {
    lastTime : performance.now(),
    frameCount : 0,
    fps : 0,
    update: ()=>{
        const now = performance.now();
        fps.frameCount++;
        if (now - fps.lastTime >= 1000) {
            fps.fps = fps.frameCount;
            fps.frameCount = 0;
            fps.lastTime = now;
        }
    }
}
fps.render = ()=>{
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(canvas.width-79, canvas.height-25, 74, 20);
    ctx.fillStyle = 'white';
    ctx.font = '14px ' + view.font;
    ctx.fillText(`FPS: ${fps.fps}`, canvas.width-75, canvas.height-10);
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

function showStatus() {
    ctx.fillStyle = 'white';
    ctx.font = '20px ' + view.font;
    ctx.fillText('tL: ' + new Date(timeline.tL), 400, 600);
    ctx.fillText('tR: ' + new Date(timeline.tR), 400, 630);
    ctx.fillText('tW: ' + timeline.tW + " sW: " + timeline.sW + " canvasW: " + canvas.width, 400, 660);
    ctx.fillText('mspp: ' + timeline.mspp, 400, 690);
    ctx.fillText('LOD: ' + timeline.lod+' granularity: ' + LOD[timeline.lod].step + ' '+ LOD[timeline.lod].granularity
        + ' duration: ' + getDuration(timeline.tL, LOD[timeline.lod].granularity, LOD[timeline.lod].step), 400, 720);
    ctx.fillText('ticks: ' + timeline.ticks[0].length + " "+timeline.ticks[1].length, 400, 750);  
    ctx.fillText('tickTWs: ' + timeline.tickTW[0] + " "+timeline.tickTW[1], 400, 780);  
}

function animate() {
    fps.update();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
        //ctx.translate(grid.offsetX, grid.offsetY);
        //ctx.scale(grid.scaleX, grid.scaleY);
        // grid.render();
        // events.render();
    ctx.restore()

    topBar.render();
    leftBar.render();
    timeline.render();

    //showStatus();

    if (view.showStatus) fps.render();

    requestAnimationFrame(animate);
}