window.addEventListener('scroll', function() {
    if( this.scrollY > 0){
        document.getElementById('headerMenu').style.backgroundColor = 'white';
    }
    else if(this.scrollY === 0){
        document.getElementById('headerMenu').style.background = 'none';
    }})