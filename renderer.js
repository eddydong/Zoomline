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
    ctx.strokeStyle = 'rgba(100,100,100,0.9)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    // Draw horizontal lines
    for (let i = startRow; i <= endRow + 1; i++) {
        const y = i * cellHeight;
        ctx.moveTo(startCol * cellWidth, y);
        ctx.lineTo((endCol + 1) * cellWidth, y);
    }
    // Draw vertical lines
    for (let j = startCol; j <= endCol + 1; j++) {
        const x = j * cellWidth;
        ctx.moveTo(x, startRow * cellHeight);
        ctx.lineTo(x, (endRow + 1) * cellHeight);
    }
    ctx.stroke();
    
    // ctx.lineWidth = 0.7;
    // // Draw cell contents only for visible cells
    // for (let i = startRow; i <= endRow; i++) {
    //     for (let j = startCol; j <= endCol; j++) {
    //         ctx.fillStyle = this.grid[i][j];
    //         ctx.fillRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
    //         ctx.strokeRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
    //     }
    // }
    ctx.restore();
}

fps.render = ()=>{
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(canvas.width-79, canvas.height-25, 74, 20);
    ctx.fillStyle = 'white';
    ctx.font = '14px ' + view.font;
    ctx.fillText(`FPS: ${fps.fps}`, canvas.width-75, canvas.height-10);
}

topBar.render = function() {
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

    showStatus();

    if (view.showStatus) fps.render();

    requestAnimationFrame(animate);
}