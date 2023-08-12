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
    let page = document.getElementsByTagName("body");
    let scale = window.getComputedStyle(document.querySelector('.zoom'), null).getPropertyValue('zoom');
    updateText({page, scale})
  }
  