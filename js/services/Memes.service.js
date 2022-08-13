const STORAGE_KEY = 'memsDB'
var gKeayword = ''
var gMemes = []
var gKeywordSearchCountMap = {}

var gImgs = [{ id: 1,
               url: '/imgs/1.jpg',
               keywords: ["funny", 'car']
             },
             { id: 2,
                url: '/imgs/2.jpg',
                keywords: ["funny", 'cat']
              },
             { id: 3,
                url: '/imgs/3.jpg',
                keywords: ['funny', 'car']
              },
             { id: 4,
                url: '/imgs/4.jpg',
                keywords: ['funny', 'cat']
              },
             { id: 5,
                url: '/imgs/5.jpg',
                keywords: ['funny', 'cat']
              },
             { id: 6,
                url: '/imgs/6.jpg',
                keywords: ['funny', 'cat']
              },
             { id: 7,
                url: '/imgs/7.jpg',
                keywords: ['funny', 'cat']
              },
             { id: 8,
                url: '/imgs/8.jpg',
                keywords: ['funny', 'cat']
              },
             { id: 9,
                url: '/imgs/9.jpg',
                keywords: ['funny', 'cat']
              },
             { id: 10,
                url: '/imgs/10.jpg',
                keywords: ['funny', 'cat']
              },
             { id: 11,
                url: '/imgs/11.jpg',
                keywords: ['funny', 'cat']
              },
             { id: 12,
                url: '/imgs/12.jpg',
                keywords: ['funny', 'cat']
              },
             { id: 13,
                url: '/imgs/13.jpg',
                keywords: ['funny', 'cat']
              },
             { id: 14,
                url: '/imgs/14.jpg',
                keywords: ['funny', 'cat']
              },
             { id: 15,
                url: '/imgs/15.jpg',
                keywords: ['funny', 'cat']
              },
             { id: 16,
                url: '/imgs/16.jpg',
                keywords: ['funny', 'cat']
              },
            ];

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            textX: 100,
            textY: 200,
            size: 20,
            align: 'left',
            color: 'red',
            strokeColor: 'black',
            strokeX: 110,
            strokeY: 210,
        }
    ]
}

setKeywordsMap() 
// _createMemes()

console.log(gMemes)
console.log(gKeywordSearchCountMap)  // need to do by the search

function setKeywordsMap() {
    gImgs.forEach(elem => elem.keywords.forEach(keyWord => { 
    const keyWordCount = gKeywordSearchCountMap[keyWord]
    gKeywordSearchCountMap[keyWord] = keyWordCount ? keyWordCount + 1 : 1
    }))
}

function addToKeywordsMap(keywords){
// keywords.forEach(keyword => )
}

function countWordApperances(txt){
  var wordsMap = [] //new Map()
  var str = txt + ' '
  var word = ''
  var wordCount = 0

  for (var i = 0; i < str.length; i++) {
      if (str.charAt(i) === ' '){
          wordCount = wordsMap[word]
          wordsMap[word] = wordCount ? wordCount + 1 : 1
          word = ''
      } else{
          word += str.charAt(i)
      } 
  }
  console.log(wordsMap);
}

function getImagesForDisplay(){
if (gKeayword === '') {
    return gImgs
} 
const images = gImgs.filter(image => searchStringInArray(gKeayword,image.keywords))
console.log('images', images)
return images
}

function getMemesForDisplay(){
  // debugger
  loadFromStorage(STORAGE_KEY )
  console.log(gMemes)
  // const images = gMemes.filter(meme => gImgs.find(imge => imge.id ===  meme.selectedImgId) )
  const images = gImgs.filter(image => gMemes.find(meme => meme.selectedImgId === image.id))
  console.log(images)
  console.log('images', images)
  return images
  }
  

// function for the model
function createMeme(imgId) {
    return {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines:[]
    }
}

function getMemeById(imgId){
    const meme = gMemes.find(meme => meme.selectedImgId === imgId )
    return meme
}

function getImgById(imgId){
    const image = gImgs.find(img => img.id === imgId )
    return image
}

function _createMemes() {
  var memes = loadFromStorage(STORAGE_KEY)
  // Nothing in storage - generate demo data
  if (!memes || !memes.length) {
      memes = []
      // for (let i = 0; i < 5; i++) {
      //     memes[i] = createMeme(i+1) 
      // }
  }
  gMemes = memes
  _saveMemesToStorage(STORAGE_KEY, gMemes)
}

function saveToMemes(meme) {
    //push to array
    gMemes.unshift(meme)
    //save to database
    _saveMemesToStorage(STORAGE_KEY, gMemes)
    return meme
}

function deleteMeme(memeId) {
  const memeIdx = gMemes.findIndex(meme => memeId === meme.selectedImgId)
  gMemes.splice(memeIdx, 1)
  _saveMemesToStorage(STORAGE_KEY, gMemes)
}

function updateMeme(selectedMeme) {
  const meme = gMemes.find(meme => meme.selectedImgId === selectedMeme.selectedImgId)
  meme.selectedLineIdx = selectedMeme.selectedLineIdx
  meme.lines = selectedMeme.lines
  _saveMemesToStorage(STORAGE_KEY, gMemes)
  return book
}


function _saveMemesToStorage() {
  saveToStorage(STORAGE_KEY, gMemes)
}





