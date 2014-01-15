// ==UserScript==
// @name        ExportGM_XHR
// @namespace   github.com/lukechampine
// @description Exports GM_xmlhttpRequest to allow cross-origin XHRs
// @include     http://lukechampine.github.io/PasteHack/*
// @include     https://lukechampine.github.io/PasteHack/*
// @version     1.0
// ==/UserScript==

// Request queue
var reqs = [];

// Flush request queue every 50 ms
window.setInterval(function() {
    while(reqs.length) {
        GM_xmlhttpRequest(reqs.shift());
    }
}, 50);

// overwrite XHR
unsafeWindow.XMLHttpRequest = function(details) {
	reqs.push(details);
}

// remove installation message
document.getElementById('install').setAttribute('style','display:none');