// function resize (element) {
//     let elSize = window.getComputedStyle(element, null).getPropertyValue('font-size');
//     console.log(elSize)
    
//     const s = `;font-size: ${parseInt(elSize)/2}px`;
//     element.setAttribute("style", element.getAttribute("style") + s);
//     for (let i = 0; i < element.children.length; i++) {
//       resize(element.children[i]);
//     }
//   }
// resize(document.getElementsByTagName("body")[0]); 
function updateText({page, scale}){
    if($(page).length > 0) {
        console.log(scale);
        $(page).css("font-size", "");
        let fontSize = parseInt($(page).css("font-size"), 10) * (scale * scale);
        $(page).css("font-size", fontSize+"px");
        for (let i = 0; i < $(page).children().length; i++) {
            const branch = $(page).children()[i];
            updateText({page: branch, scale});
        }
    }
  }
function ss(){
    let page = document.getElementsByTagName("body")[0];
    let scale = window.getComputedStyle(document.querySelector('.zoom'), null).getPropertyValue('zoom');
    updateText({page, scale}) 
  }
ss()