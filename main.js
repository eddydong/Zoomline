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
    this.color = null;
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