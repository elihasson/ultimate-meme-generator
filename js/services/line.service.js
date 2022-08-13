var gLine = []









function isLineClicked(clickedPos) {
    // const pos = gCircle.pos
    const { pos } = gLine
    const distance = (pos.x - clickedPos.x) + (pos.y - clickedPos.y) 
    // draw size = 
    //
    // sizeX = endPosX - startPosX
    // sizeV = endPosY - startPosY
    // if (pos.x - clickedPos.x > 0 && pos.x - clickedPos.x < sizeX && 
    // pos.y - clickedPos.y > 0 && pos.y - clickedPos.y < sizeY) 
    // return the size of line

    return distance <= gLine.size
}

function setLineDrag(isDrag) {
    gLine.isDrag = isDrag
}

function moveLine(dx, dy) {
    gLine.pos.x += dx
    gLine.pos.y += dy
}

function getLine() {
    return gLine
}