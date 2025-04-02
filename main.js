var pallet = [
    "#FF0000", // red
    "#00FF00", // green
    "#0000FF", // blue
    "#FFFF00", // yellow
    "#FF00FF", // magenta
    "#00FFFF", // cyan
    "#FFA500", // orange
    "#800080", // purple
    "#808080", // gray
    "#FFC0CB", // pink
    "#A52A2A", // brown
    "#FFD700", // gold
    "#ADFF2F", // greenyellow
    "#7FFF00", // chartreuse
    "#D2691E", // chocolate
    "#FF4500", // orange red
    "#FF1493", // deep pink
];

const BU = [
    {
        name: "BU1",
        desc: "Building 1",
        color: "#FF0000", 
        eventTypes: [
            { name: "Lecture", color: "#FF0000" },
            { name: "Lab", color: "#00FF00" },
            { name: "Seminar", color: "#0000FF" },
            { name: "Workshop", color: "#FFFF00" },
            { name: "Meeting", color: "#FF00FF" },
            { name: "Conference", color: "#00FFFF" },
            { name: "Exam", color: "#FFA500" }
        ]
    },
    {
        name: "BU2",
        desc: "Building 2",
        color: "#00FF00", 
        eventTypes: [
            { name: "Lecture", color: "#FF0000" },
            { name: "Lab", color: "#00FF00" },
            { name: "Seminar", color: "#0000FF" },
            { name: "Workshop", color: "#FFFF00" },
            { name: "Meeting", color: "#FF00FF" },
            { name: "Conference", color: "#00FFFF" },
            { name: "Exam", color: "#FFA500" }
        ]
    }
    // Add more buildings as needed
];

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
    this.color 
}

function Grid() {
    this.grid = [];
    this.rows = 0;
    this.cols = 0;
}
Grid.prototype.init = function(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.grid = Array.from({ length: rows }, () => Array(cols).fill(0));
}