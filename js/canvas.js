'use strict'
var gSelectedMeme = null
// var gSelectedImage
var gElCanvas
var gCtx
// var gCtxState = 0
var gLine 
var gStartPos
var canvasTextArea = null
var gSelLineIdx = 0
var gSave = false 


const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

initCanvas()

function initCanvas(){  
    gElCanvas = document.querySelector('#main-canvas')
    gCtx = gElCanvas.getContext('2d')
    gCtx.save()
    
    resizeCanvas()
    // const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
    addListeners()
    // drawImageMeme(gSelectedImage.id)
}

function addLine(){
    let lineIdx = gSelectedMeme.lines.length
    if (lineIdx < 3){
        gSelectedMeme.lines[lineIdx] = createLineFromEditor()
        switch (lineIdx) {
            case 0:
                gSelectedMeme.lines[lineIdx].posY = 10 + gSelectedMeme.lines[lineIdx].size /2              
                break
            case 1:
                gSelectedMeme.lines[lineIdx].posY = gElCanvas.height - 10 - gSelectedMeme.lines[lineIdx].size /2
                break
            case 2:
                gSelectedMeme.lines[lineIdx].posY = gElCanvas.height / 2
                break
        }
    } 
    gSelLineIdx = lineIdx
    gSelectedMeme.selectedLineIdx = gSelLineIdx
    renderCanvas()
}

function switchLine(){
    clearTextBox()
    if (gSelLineIdx < gSelectedMeme.lines.length - 1){
        ++gSelLineIdx  
    } else {
        gSelLineIdx = 0
    }
    gSelectedMeme.selectedLineIdx = gSelLineIdx
    renderCanvas()
}

function moveLine(value) {
    // value 1 - move down
    // value -1 - move up
    if (gSelectedMeme.lines.length !== 0){
        gSelectedMeme.lines[gSelLineIdx].posY += value
        renderCanvas()
    } 
}

function deleteTextLine() {
    if (gSelectedMeme.lines.length !== 0){
        gSelectedMeme.lines.splice(gSelLineIdx, 1)
        gSelLineIdx = 0
        gSelectedMeme.selectedLineIdx = gSelLineIdx
    
        clearTextBox()
        renderCanvas()
    }
}

function setFontSize(value) {
    if (gSelectedMeme.lines.length !== 0){
        gSelectedMeme.lines[gSelLineIdx].size += value
        renderCanvas()
    }
}

function alignText(value){
    if (gSelectedMeme.lines.length !== 0){
        gSelectedMeme.lines[gSelLineIdx].align = value
        switch (value) {
            case 'left':
                gSelectedMeme.lines[gSelLineIdx].posX = 10              
                break
            case 'right':
                gSelectedMeme.lines[gSelLineIdx].posX = gElCanvas.width - 10              
                break
            case 'center':
                gSelectedMeme.lines[gSelLineIdx].posX = gElCanvas.width / 2
                break
        }
        renderCanvas()
    }
} 
    
function setFontType(value){
    // set the font by the value from the font selector
    if (gSelectedMeme.lines.length !== 0){
        gSelectedMeme.lines[gSelLineIdx].font = value
        renderCanvas()
    }
}

function changeStrokeColor(color){
    if (gSelectedMeme.lines.length !== 0){
        gSelectedMeme.lines[gSelLineIdx].strokeColor = color
        renderCanvas()
    }
}

function changefontColor(color){
    if (gSelectedMeme.lines.length !== 0){
        gSelectedMeme.lines[gSelLineIdx].color = color
        // console.log(color)
        renderCanvas()
    }
}



function clearTextBox(){
    gCanvasArea.querySelector('.control-box .text-on-canvas .add-text').value = ''
}

// draw meme, if image doesnt have a meme - create it
function drawMeme(imgId) {
    if (!gSelectedMeme){
        var meme = getMemeById(imgId)
        if (meme) {
            gSelectedMeme = meme
        } else {
            gSelectedMeme = createMeme(imgId)

        }
    }
    var img = new Image()
    img.src = gSelectedImage.url
    gCtx.beginPath()
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
    gCtx.restore()
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,xend,yend
    gCtx.closePath()
    gSelectedMeme.lines.forEach((line,index) => {
                                gCtx.beginPath()
                                gCtx.textBaseline = 'middle'
                                gCtx.textAlign = line.align
                                gCtx.font      = `${line.size}px ${line.font}` 
                                gCtx.fillStyle = line.color
                                gCtx.fillText(line.txt, line.posX, line.posY)
                                gCtx.strokeStyle = line.strokeColor
                                gCtx.strokeText(line.txt, line.posX, line.posY , gElCanvas.width)
                                gCtx.closePath()
                                if (index === gSelLineIdx && !gSave){
                                    gCtx.beginPath()
                                    gCtx.fillStyle = 'gray'
                                    gCtx.globalAlpha = 0.5                                    
                                    gCtx.fillRect(10 , line.posY - line.size/2, gElCanvas.width - 10, line.size)
                                    gCtx.globalAlpha = 1
                                    gCtx.closePath()
                                }
                            })

}

function createLine() {
    return {
        txt: 'your text here',
        posX : 10,
        posY : 10,
        font: 'david',
        size: 40,
        align: 'left',
        color: 'red',
        strokeColor: 'black',
        strokeX: 10,
        strokeY: 10,
    }
} 

function createLineFromEditor() {
    const font = gCanvasArea.querySelector('.control-box .textbox-input .font-selector').value
    const color = gCanvasArea.querySelector('.control-box .textbox-input .font-align-and-size .edit-list-2 .font-color').value
    const strokeColor = gCanvasArea.querySelector('.control-box .textbox-input .font-align-and-size .edit-list-2 .stroke-color').value
    // console.log(elem , elem.value)
    return {
        txt: 'your text here',
        posX : 10,
        posY : 10,
        font: font,
        size: 40,
        align: 'left',
        color: color,
        strokeColor: strokeColor ,
        strokeX: 10,
        strokeY: 10,
    }
} 


function renderCanvas() {
    // drawImageMeme(gSelectedImage.dataset.imgid)
    drawMeme(gSelectedImage.id)
    // gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)//img,x,y,xend,yend
    // gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    // gCtx.fillStyle = "black"
    // gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
    // renderLines()
}



//save, download and share
function saveMeme() {
    saveToMemes(gSelectedMeme)
}

function downloadMeme() {
    gSave = true
    renderCanvas()
    // const image = gElCanvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
    const image = gElCanvas.toDataURL("image/png", 1.0).replace("image/png")
    let link = document.createElement('a')
    link.download = "my-meme.jpg"
    link.href = image
    link.click()
    gSave = false
}

function shareToFacebook() {
    // debugger
    // document.querySelector('.upload-area').remove('display-none')
    // gCanvasArea.classList.add('display-none')
    // uploadImg()
    // document.querySelector('.upload-area').add('display-none')
    // gCanvasArea.classList.remove('display-none')

    console.log('share')
}

//canvas functions
// resize canvas onload and when changing screen size functions
function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetWidth
    // gElCanvas.height = elContainer.offsetHeight
}

function chooseLine(elem){
    // console.log('hi')
    gChosenLineElement = elem
}





// mouse events
function onDown(ev) {
    // Getting the clicked position
    const pos = getEvPos(ev)
    // { x: 15, y : 15 }
    if (!isLineClicked(pos)) return
    setLineDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
    renderCanvas()
}

function onMove(ev) {
    const line = getLine();
    if (!line.isDrag) return
    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(dx, dy)
    gStartPos = pos
    renderCanvas()
}

function onUp() {
    setLineDrag(false)
    document.body.style.cursor = 'grab'
}

function selectLine(meme){
    // mark the selected line 
    // meme.selectedLineIdx
}

function addTextArea(){
    // const strHtml = '<textarea style={{ position: "fixed",top: 100, left: 100}} />'
    // gElCanvas.innerHTML = strHtml
    
}
function addTextLinea(){
    var textarea = document.createElement('textarea');
    textarea.className = 'info';
    // textarea.addEventListener('mousedown', mouseDownOnTextarea);
    document.body.appendChild(textarea);
        var x = gElCanvas.offsetLeft
        var y = gElCanvas.offsetTop
        textarea.value = "x: " + x + " y: " + y;
        textarea.style.top =  gElCanvas.offsetTop + 'px';
        textarea.style.left = gElCanvas.offsetLeft + 'px';
}
//listeners
function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
        // renderCanvas()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}


    