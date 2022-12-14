'use strict'
var gSelectedImage = []
var gImageElement
var gDisplayMemes = false
var gDisplayCanvas = false

var gCanvasArea = document.querySelector('.canvas-area')
var gGalleryLayout = document.querySelector('.gallery-layout')

init()

function init() {
    gCanvasArea.classList.add('display-none')
    renderImages()
    gImageElement = gGalleryLayout.querySelector('.card-1')
}

function displayGallery() {
    gSelectedMeme = null
    gCanvasArea.classList.add('display-none')
    gGalleryLayout.classList.remove('display-none')
    gDisplayMemes = false
    gDisplayCanvas = false  
    renderImages()
}

function displayMemes() {
    gSelectedMeme = null
    gCanvasArea.classList.add('display-none')
    gGalleryLayout.classList.remove('display-none')
    gDisplayMemes = true  
    gDisplayCanvas = false  
    renderImages()
}

function displayCanvas() {
    gCanvasArea.classList.remove('display-none')
    gGalleryLayout.classList.add('display-none')
    initCanvas()
    spreadInCanvas(gImageElement)
    gDisplayCanvas = true
}

function renderImages() {
    console.log('render')
    var images
    if (gDisplayMemes){
        images = getMemesForDisplay()
    } else {
        images = getImagesForDisplay()
    }
    // const images = getImagesForDisplay()
    const strHtmls = images.map(image => `
    <div data-imgid="${image.id}" class="card card-${image.id}" onclick="spreadInCanvas(this)">
        <img src="${image.url}" alt="" class="card-image">
    </div> 
    `
    )

    document.querySelector('.grid-container').innerHTML = strHtmls.join('')
}

function spreadInCanvas(el) {
    gSelectedImage = getImgById(+el.dataset.imgid)
    gImageElement = el
    gGalleryLayout.classList.add('display-none')
    gCanvasArea.classList.remove('display-none')
    drawMeme(gSelectedImage.id)
    gDisplayCanvas = true
}

// call also from button search
function searchMeme(){
    gKeayword = gGalleryLayout.querySelector('.search-box .filter-meme-search').value
    renderImages()
}

function handleKeyEvent(event) {
    // seach-box gallery/memes area 
    if (!gDisplayCanvas && event.key === 'Enter'){
        searchMeme()
    }
    //change line text on key evnt - canvas area
    var textToRender = gCanvasArea.querySelector('.control-box .text-on-canvas .add-text').value
    if (gDisplayCanvas && textToRender !== ''){
        if (gSelectedMeme.lines.length === 0)
            gSelectedMeme.lines[gSelLineIdx] = createLine()
            
        gSelectedMeme.lines[gSelLineIdx].txt = textToRender
        renderCanvas() 
    }

    switch (event.code) {
        case 'ArrowUp':
            moveLine(-1)
            break;
        case 'ArrowDown':
            moveLine(1)
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
        default:
            return null;
    }
}

function handleMouseEvents(event) {

}

