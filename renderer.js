Grid.prototype.render = function() {
    ctx.save();
    const cellHeight = this.cellHeight;
    const cellWidth = this.cellWidth;
    
    // Calculate visible area in grid coordinates
    const visibleLeft = -this.offsetX / this.scaleX + leftBar.width / this.scaleX;
    const visibleTop = -this.offsetY / this.scaleY + topBar.height / this.scaleY;
    const visibleRight = visibleLeft + (canvas.width / this.scaleX) - leftBar.width / this.scaleX;
    const visibleBottom = visibleTop + (canvas.height / this.scaleY) - topBar.height / this.scaleY;
    
    // Convert to grid cell indices
    const startCol = Math.max(0, Math.floor(visibleLeft / cellWidth));
    const endCol = Math.min(this.cols - 1, Math.ceil(visibleRight / cellWidth));
    const startRow = Math.max(0, Math.floor(visibleTop / cellHeight));
    const endRow = Math.min(this.rows - 1, Math.ceil(visibleBottom / cellHeight));
    
    // Draw grid lines only for visible cells
    for (let i = startRow; i <= endRow; i++) {
        for (let j = startCol; j <= endCol; j++) {
            ctx.strokeRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
        }
    }
    
    ctx.lineWidth = 0.7;
    // Draw cell contents only for visible cells
    for (let i = startRow; i <= endRow; i++) {
        for (let j = startCol; j <= endCol; j++) {
            ctx.fillStyle = this.grid[i][j];
            ctx.fillRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
            ctx.strokeRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
        }
    }
    ctx.restore();
}

fps.render = ()=>{
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(canvas.width-79, 5, 74, 20);
    ctx.fillStyle = 'white';
    ctx.font = '14px ' + view.font;
    ctx.fillText(`FPS: ${fps.fps}`, canvas.width-75, 20);
}

function animate() {
   //inertiaStep();
    fps.update();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
        ctx.translate(grid.offsetX, grid.offsetY);
        ctx.scale(grid.scaleX, grid.scaleY);
        grid.render();
    ctx.restore()

    topBar.render();
    leftBar.render();
    if (view.showStatus) fps.render();

    requestAnimationFrame(animate);
}