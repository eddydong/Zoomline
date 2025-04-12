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


const LOD = [
    {
        granularity: 'second',
        step: 0.1,
        format: [
            { minute: "2-digit", second: "2-digit", fractionalSecondDigits: 1 },
            { year: "numeric", month: "long", day: "2-digit", hour: "2-digit",hour12: false, }
        ]
    },
    {
        granularity: 'second',
        step: 1,
        format: [
            {  minute: "2-digit", hour12: false, second: "2-digit" },
            { year: "numeric", month: "long", day: "2-digit", hour: "2-digit",hour12: false }
        ]
    },
    {
        granularity: 'second',
        step: 10,
        format: [
            { minute: "2-digit", hour12: false, second: "2-digit" },
            { year: "numeric", month: "long", day: "2-digit", hour: "2-digit",hour12: false }
        ]
    },
    {
        granularity: 'minute',
        step: 1,
        format: [
            { hour: "2-digit", minute: "2-digit", hour12: false },
            { year: "numeric", month: "long", day: "2-digit",hour12: false,  hour: "2-digit"}
        ]
    },
    {
        granularity: 'minute',
        step: 10,
        format: [
            { hour: "2-digit", minute: "2-digit", hour12: false },
            { year: "numeric", month: "long", day: "2-digit" }
        ]
    },
    {
        granularity: 'hour',
        step: 1,
        format: [
            { hour: "2-digit", minute: "2-digit", hour12: false },
            { year: "numeric", month: "long", day: "2-digit" }
        ]
    },
    {
        granularity: 'hour',
        step: 8,
        format: [
            { hour: "2-digit", minute: "2-digit", hour12: false },
            { year: "numeric", month: "long", day: "2-digit" }
        ]
    },
    {
        granularity: 'day',
        step: 1,
        format: [
            { day: "2-digit", weekday: "short" },
            { year: "numeric", month: "long" }
        ]
    },
    {
        granularity: 'week',
        step: 1,
        format: [
            { day: "2-digit", weekday: "short" },
            { year: "numeric", month: "long" }
        ]
    },
    {
        granularity: 'month',
        step: 1,
        format: [
            { month: "short"  },
            { year: "numeric" }
        ]
    },
    {
        granularity: 'month',
        step: 3,
        format: [
            { month: "short"  },
            { year: "numeric" }
        ]
    },
    {
        granularity: 'year',
        step: 1,
        format: [
            { year: "numeric"},
            { year: "numeric"}
        ]
    },
    {
        granularity: 'year',
        step: 10,
        format: [
            { year: "numeric"},
            { year: "numeric", era: "short"  }
        ]
    },
    {
        granularity: 'year',
        step: 100,
        format: [
            { year: "numeric", era: "short" },
            { year: "numeric" , era: "short" }
        ]
    },
    {
        granularity: 'year',
        step: 1000,
        format: [
            { year: "numeric", era: "short" },
            { year: "numeric" , era: "short" }
        ]
    },
    {
        granularity: 'year',
        step: 10000,
        format: [
            { year: "numeric", era: "short" },
            { year: "numeric" , era: "short" }
        ]
    },
    {
        granularity: 'year',
        step: 100000,
        format: [
            { year: "numeric", era: "short" },
            { year: "numeric" , era: "short" }
        ]
    }
];

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
        this.sL = leftBar.width,
        this.sR = canvas.width;
        this.sW = canvas.width - leftBar.width;
        this.tW = getDuration(this.tL, LOD[this.lod].granularity, LOD[this.lod].step);
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

var events = {
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