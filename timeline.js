var timeline = {
    ticks : [], // placeholder
    ticksUpper : [], // placeholder
    // time metrics
    tL : new Date("2025-01-01").getTime(), 
    tR : 0, // placeholder
    minTL : -6e15,
    maxTR : 6e15,
    lod : 8,
    labelW: 100,
    
    topBar : {
        height: 50,
        color: 'rgba(30,30,30,0.95)',
        leftT: Date.now(),
        render : function() {
            ctx.save();
            ctx.fillStyle = this.color;
            ctx.fillRect(0, 0, canvas.width, this.height);
    
        // currentTime = viewport.tLeft;
        // viewport.update();
    
        // while (currentTime <= viewport.tRight) {
        //     const x = leftBar.width + ((currentTime - viewport.tLeft) / lod[viewport.resID] + grid.offsetX) * grid.scaleX;
        //     ctx.fillStyle = 'white';
        //     ctx.font = `14px ${view.font}`;
        // //    const dateString = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        //     ctx.fillText(currentTime, x, 30);
    
        //     currentTime = currentTime + lod[viewport.resID];
        // }
    
            ctx.restore();
        }
    },
    
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
    //     tWidth: lod[1] * view.scaleX,
    //     tLeft: Date.now(),
    //     tRight: 0, // placeholder, will be calculated after viewport is defined
    //     msPerPixel: 0, // Placeholder, will be calculated after viewport is defined
    //     lod: 0,
    //     update: function() {
    //         viewport.tRight = viewport.tLeft + viewport.tWidth;
    //         viewport.msPerPixel = (viewport.tRight - viewport.tLeft) / viewport.width;
    //     }        
    // }
    
    init : function() {
        this.tW = dt.getDuration(this.tL, lod[this.lod].granularity, lod[this.lod].step);
        this.resize();
    },
    resize : function() {
        this.sL = events.leftBar.width,
        this.sR = canvas.width;
        this.sW = canvas.width - events.leftBar.width;
        this.update();
    },
    update: function() {
        this.minTW = dt.getDuration(this.tL, lod[1].granularity, lod[1].step); 
        this.maxTW = dt.getDuration(this.tL, lod[lod.length-1].granularity, lod[lod.length-1].step); 
        this.tR = this.tL + this.tW;
        this.mspp = this.tW / this.sW;
        this.labelTW = this.mspp * this.labelW;
        dt.getDTList(this.tL, this.tR, timeline);
    },

    render : function() {
        this.topBar.render();

        ctx.save();

        for (let l =0; l<2; l++)
        for (let i = 0; i < this.ticks[l].length; i++) {
            var sX = (this.ticks[l][i].dt.getTime() - this.tL) / this.mspp;
            var opacity = 1;
            if (sX < 0 & sX > -this.tickTW[l]) opacity = (1 - (- sX / (this.tickTW[l]-events.leftBar.width/2))) * 1; 
            sX += events.leftBar.width;
            sX = Math.max(sX, events.leftBar.width);

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
                var formattedDate = new Intl.DateTimeFormat('default', lod[this.lod].format[l]).format(date);
                ctx.fillText(formattedDate, sX + 6, l == 0 ? 44 : 20);
            }
        }
        ctx.restore();
    }
}