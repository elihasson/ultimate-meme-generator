'use strict'
var gSelectedImage = []
var gImageElement
var gDisplayMemes = false

var gCanvasArea = document.querySelector('.canvas-area')
var gGalleryLayout = document.querySelector('.gallery-layout')

init()

function init() {
    gCanvasArea.classList.add('display-none')
    renderImages()
    gImageElement = gGalleryLayout.querySelector('.card-1')
    gSelectedImage = getImgById(1)
    // document.querySelector('.upload-area').add('display-none')


    // gElCanvas = document.querySelector('#main-canvas')
    // gCtx = gElCanvas.getContext('2d')
}

function displayGallery() {
    gSelectedMeme = null
    gCanvasArea.classList.add('display-none')
    gGalleryLayout.classList.remove('display-none')
    gDisplayMemes = false
    renderImages()
}


function displayMemes() {
    gSelectedMeme = null
    gCanvasArea.classList.add('display-none')
    gGalleryLayout.classList.remove('display-none')
    gDisplayMemes = true    
    renderImages()
}

function displayCanvas() {
    gCanvasArea.classList.remove('display-none')
    gGalleryLayout.classList.add('display-none')
    initCanvas()
    spreadInCanvas(gImageElement)
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
}

// call also from button search
function searchMeme(){
    gKeayword = gGalleryLayout.querySelector('.search-box .filter-meme-search').value
    renderImages()
}

function handleKeyEvent(event) {
    // seach-box gallery/memes area 
    var textToRender = gGalleryLayout.querySelector('.search-box .filter-meme-search').value
    if (textToRender !== '' && event.key === 'Enter')
    searchMeme()
    
    //change line text on key evnt - canvas area
    textToRender = gCanvasArea.querySelector('.control-box .text-on-canvas .add-text').value
    if (textToRender !== ''){
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

