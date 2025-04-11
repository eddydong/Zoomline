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
}

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


var viewport = {
    left: leftBar.width,
    top: topBar.height,
    width: canvas.width - leftBar.width,
    height: canvas.height - topBar.height,
    tWidth: LOD[1] * view.scaleX,
    tLeft: Date.now(),
    tRight: 0, // placeholder, will be calculated after viewport is defined
    msPerPixel: 0, // Placeholder, will be calculated after viewport is defined
    lod: 0,
    update: function() {
        viewport.tRight = viewport.tLeft + viewport.tWidth;
        viewport.msPerPixel = (viewport.tRight - viewport.tLeft) / viewport.width;
    }        
}

var timeline = {
    ticks : [], // placeholder
    ticksUpper : [], // placeholder
    // time metrics
    tL : 1743752224853, 
    tR : 0, // placeholder
    init : function() {
        this.sL = leftBar.width,
        this.sR = canvas.width;
        this.sW = canvas.width - leftBar.width;
        this.lod = 8;
        this.tW = getDuration(this.tL, LOD[this.lod].granularity, LOD[this.lod].step);
        this.update();
    },
    update: function() {
        this.minTW = getDuration(this.tL, LOD[1].granularity, LOD[1].step); 
        this.maxTW = getDuration(this.tL, LOD[LOD.length-1].granularity, LOD[LOD.length-1].step); 
        this.tR = this.tL + this.tW;
        this.mspp = this.tW / this.sW;
        this.labelTW = this.mspp * view.labelW;
        //var foundIndex = LOD.findIndex(lod => view.labelW * this.mspp <= getDuration(this.tL, lod.granularity, lod.step));
        //this.lod = Math.max(0, foundIndex === -1 ? LOD.length - 1 : foundIndex);
        getDTList(this.tL, this.tR, timeline);
    },
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

function Cell(name, desc, start, duration, end) {
    this.name = name || "";
    this.type = 
    this.desc = desc || "";
    this.start = start || null; // datetime
    this.start = start ? new Date(start) : null;
    if (start && duration) { // duration is in minutes
        this.duration = duration;
        this.end = new Date(start.getTime() + duration * 60000);
    } else if (start && end) {
        this.end = end;
        this.duration = Math.round((end - start) / 60000);
    }
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.color = getRandomColor();
}

function Grid(rows, cols) {
    this.grid = [];
    this.rows = rows;
    this.cols = cols;
    this.cellWidth = 100;
    this.cellHeight = 100;
    this.grid = Array.from({ length: rows }, 
        () => Array.from({ length: cols }, () => getRandomColor()));
    this.offsetX = leftBar.width;
    this.offsetY = topBar.height;
    this.scaleX = Math.max(1, (canvas.width - leftBar.width) / (this.cellWidth * this.cols));
    this.scaleY = Math.max(1, (canvas.height - topBar.height) / (this.cellHeight * this.rows));
}
