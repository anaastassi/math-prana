window.addEventListener('scroll', function() {
    if( this.scrollY > 120){
        document.getElementById('headerMenu').style.backgroundColor = 'white';
    }
    else if(this.scrollY <= 120){
        document.getElementById('headerMenu').style.background = 'none';
    }})