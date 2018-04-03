window.addEventListener("load", function(event) {
    var clipboard = new ClipboardJS('.contact-email');
    AOS.init();
});

//skrypt wyłączający animacje chmur na telefonach
window.addEventListener("scroll", function(e) {
    var cloudsElement = document.querySelector(".clouds")
    var nameOfAnimateClass = "clouds__animate"


    if(window.innerHeight < window.pageYOffset){
        if(hasClass(cloudsElement, nameOfAnimateClass)){
            cloudsElement.classList.remove( nameOfAnimateClass);
        }
    }else{
        if(!hasClass(cloudsElement,nameOfAnimateClass)){
            cloudsElement.classList.add( nameOfAnimateClass);
        }
    }


    //.circle-box__personal-card  -  Parallax
    var circlePersonalCard = document.querySelector(".circle-box__personal-card")
    circlePersonalCard.style.top =  (50 + window.pageYOffset * 0.055) < 110 ? (50 + window.pageYOffset * 0.05 + "%") : "110%";
});

function hasClass(element, cssClass){
    return (' ' + element.className + ' ').indexOf(' ' + cssClass + ' ') > -1;
}
