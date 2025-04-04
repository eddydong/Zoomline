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
