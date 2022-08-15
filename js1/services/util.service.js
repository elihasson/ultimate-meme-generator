'use strict'

function makeId(length = 6) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var txt = ''
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function searchStringInArray (str, strArray) {
    for (let i=0; i<strArray.length; i++) {
        if (strArray[i].match(str) && strArray[i].length === str.length)
         return true;
    }
    return false;
}