var leftBar = {
    width : 200,
    color: 'rgba(255,255,255,0.1)',
    render : function() {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(0, 0, this.width, canvas.height);
        ctx.restore();
    }
}

var topBar = {
    height: 50,
    color: 'rgba(255,255,255,0.1)',
    leftT: Date.now(),
    render : function() {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(0, 0, canvas.width, this.height);

    // currentTime = viewport.tLeft;
    // viewport.update();

    // while (currentTime <= viewport.tRight) {
    //     const x = leftBar.width + ((currentTime - viewport.tLeft) / LOD[viewport.resID] + grid.offsetX) * grid.scaleX;
    //     ctx.fillStyle = 'white';
    //     ctx.font = `14px ${view.font}`;
    // //    const dateString = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    //     ctx.fillText(currentTime, x, 30);

    //     currentTime = currentTime + LOD[viewport.resID];
    // }

        ctx.restore();
    }
};

// {
//     weekday: 'narrow' | 'short' | 'long',
//     era: 'narrow' | 'short' | 'long',
//     year: 'numeric' | '2-digit',
//     month: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long',
//     day: 'numeric' | '2-digit',
//     hour: 'numeric' | '2-digit',
//     minute: 'numeric' | '2-digit',
//     second: 'numeric' | '2-digit',
//     timeZoneName: 'short' | 'long',
  
//     // Time zone to express it in
//     timeZone: 'Asia/Shanghai',
//     // Force 12-hour or 24-hour
//     hour12: true | false,
  
//     // Rarely-used options
//     hourCycle: 'h11' | 'h12' | 'h23' | 'h24',
//     formatMatcher: 'basic' | 'best fit'
// }

// console.log(new Intl.DateTimeFormat('default', {
//     hour: 'numeric',
//     minute: 'numeric',
//     second: 'numeric'
// }).format(date))

// var viewport = {
//     left: leftBar.width,
//     top: topBar.height,
//     width: canvas.width - leftBar.width,
//     height: canvas.height - topBar.height,
//     tWidth: LOD[1] * view.scaleX,
//     tLeft: Date.now(),
//     tRight: 0, // placeholder, will be calculated after viewport is defined
//     msPerPixel: 0, // Placeholder, will be calculated after viewport is defined
//     lod: 0,
//     update: function() {
//         viewport.tRight = viewport.tLeft + viewport.tWidth;
//         viewport.msPerPixel = (viewport.tRight - viewport.tLeft) / viewport.width;
//     }        
// }

var timeline = {
    ticks : [], // placeholder
    ticksUpper : [], // placeholder
    // time metrics
    tL : 1743752224853, 
    tR : 0, // placeholder
    minTL : -6e15,
    maxTR : 6e15,
    lod : 8,
    init : function() {
        this.tW = getDuration(this.tL, LOD[this.lod].granularity, LOD[this.lod].step);
        this.resize();
    },
    resize : function() {
        this.sL = leftBar.width,
        this.sR = canvas.width;
        this.sW = canvas.width - leftBar.width;
        this.update();
    },
    update: function() {
        this.minTW = getDuration(this.tL, LOD[1].granularity, LOD[1].step); 
        this.maxTW = getDuration(this.tL, LOD[LOD.length-1].granularity, LOD[LOD.length-1].step); 
        this.tR = this.tL + this.tW;
        this.mspp = this.tW / this.sW;
        this.labelTW = this.mspp * view.labelW;
        getDTList(this.tL, this.tR, timeline);
    },
}
timeline.render = function() {
    ctx.save();

    for (let l =0; l<2; l++)
    for (let i = 0; i < this.ticks[l].length; i++) {
        var sX = (this.ticks[l][i].dt.getTime() - this.tL) / this.mspp;
        var opacity = 1;
        if (sX < 0 & sX > -this.tickTW[l]) opacity = (1 - (- sX / (this.tickTW[l]-leftBar.width/2))) * 1; 
        sX += leftBar.width;
        sX = Math.max(sX, leftBar.width);

        if (opacity == 1 ){
            ctx.beginPath();
            ctx.moveTo(sX, l == 0 ? 25 : 0);
            ctx.lineTo(sX, canvas.height);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.lineWidth = l == 0 ? 0.7 : 1;
            ctx.stroke(); // Render all lines at once
        }

        if (this.ticks[l][i].label) {
            ctx.font = view.fontSize + 'px ' + view.font;
            ctx.fillStyle = `rgba(255, 255, 255, ${l == 0 ? opacity : opacity * 0.7})`;
            var date = this.ticks[l][i].dt;
            var formattedDate = new Intl.DateTimeFormat('default', LOD[this.lod].format[l]).format(date);
            ctx.fillText(formattedDate, sX + 6, l == 0 ? 44 : 20);
        }
    }
    ctx.restore();
}