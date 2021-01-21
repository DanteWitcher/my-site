'use strict';

~function() {
    const largeImg = document.getElementById('largeImg');
    document.getElementById('thumbs').onclick = function(event) {

    event = event || window.event;
    let target = event.target;
    while(target != this) {
        if(target.nodeName == "A") {
            changePicture(target.href, target.title);
            return false;
        }
        target = target.parentNode;
    }
    };
function changePicture(href, title) {
    largeImg.src = href;
    largeImg.alt = title;
}
//underload
const imgs = document.getElementById('thumbs').getElementsByTagName('img');
for (let i = 0; i < imgs.length; i++) {
    const url = imgs[i].parentNode.href;

    const img = document.createElement('img');
    img.src = url;
}}();
