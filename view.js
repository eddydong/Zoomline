var view = {
    font: "Zoomline",
    fontSize: 14,
    showStatus : true,
    textPadding : 5, // Padding between the text and the bar edges
    scaleX: 1, // Default scaleX value

    fps : {
        lastTime : performance.now(),
        frameCount : 0,
        fps : 0,
        update: ()=>{
            const now = performance.now();
            view.fps.frameCount++;
            if (now - view.fps.lastTime >= 1000) {
                view.fps.fps = view.fps.frameCount;
                view.fps.frameCount = 0;
                view.fps.lastTime = now;
            }
        },
        render : function(){
            ctx.fillStyle = 'rgba(0,0,0,0.6)';
            ctx.fillRect(canvas.width-79, canvas.height-25, 74, 20);
            ctx.fillStyle = 'white';
            ctx.font = '14px ' + view.font;
            ctx.fillText(`FPS: ${view.fps.fps}`, canvas.width-75, canvas.height-10);
        }
    },

    getPixelRGBA : function(x, y) {
        const imageData = ctx.getImageData(x, y, 1, 1);
        return {
            r: imageData.data[0],
            g: imageData.data[1],
            b: imageData.data[2],
            a: imageData.data[3]
        };
    },

    showStatus: function() {
        ctx.fillStyle = 'white';
        ctx.font = '20px ' + view.font;
        ctx.fillText('tL: ' + new Date(timeline.tL), 400, 600);
        ctx.fillText('tR: ' + new Date(timeline.tR), 400, 630);
        ctx.fillText('tW: ' + timeline.tW + " sW: " + timeline.sW + " canvasW: " + canvas.width, 400, 660);
        ctx.fillText('mspp: ' + timeline.mspp, 400, 690);
        ctx.fillText('lod: ' + timeline.lod+' granularity: ' + lod[timeline.lod].step + ' '+ lod[timeline.lod].granularity
            + ' duration: ' + getDuration(timeline.tL, lod[timeline.lod].granularity, lod[timeline.lod].step), 400, 720);
        ctx.fillText('ticks: ' + timeline.ticks[0].length + " "+timeline.ticks[1].length, 400, 750);  
        ctx.fillText('tickTWs: ' + timeline.tickTW[0] + " "+timeline.tickTW[1], 400, 780);  
    },

    animate: function() {
        view.fps.update();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
            //ctx.translate(grid.offsetX, grid.offsetY);
            //ctx.scale(grid.scaleX, grid.scaleY);
            // grid.render();
            // events.render();
        ctx.restore()
        events.render();
        timeline.render();
        //showStatus();
        if (view.showStatus) view.fps.render();
        requestAnimationFrame(view.animate);
    }
}