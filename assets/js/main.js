const lazyLoad = new LazyLoad();

// Trabajar las imagenes a cargar
const filter = Array.from( document.querySelectorAll( "[data-lazy]" ) );
for( const f of filter ){
    lazyLoad.observe( f.dataset.url, f, f.dataset.lazy_type, Fade );
}

// Funcion para mostrar con fade las imagenes
function Fade(event){
    event.target.classList.add('fade-in');
}

// Agregar el anho actual al footer
( _ => {
    const humitaYear = document.querySelector(".humita-year");
    if(humitaYear) humitaYear.dataset.year =  new Date().getFullYear();
})();

// Compartir card
const shareCard = async _ => {
    var card = document.querySelector("body");
    html2canvas(card, {windowWidth: 540, windowHeight: 960, backgroundColor: null}).then(async (canvas) => {
        //var link = document.createElement("a");
        //document.body.appendChild(link);

        

        //shareFile(dataURLtoFile(canvas.toDataURL()), "JanKenUP! Card");
        
        //link.download = "html_image.jpg";
        //link.href = canvas.toDataURL();
        //link.target = '_blank';
        //link.click();

        const dataUrl = canvas.toDataURL();
        const blob = await (await fetch(dataUrl)).blob();
        const filesArray = [
            new File(
            [blob],
            'animation.png',
            {
                type: blob.type,
                lastModified: new Date().getTime()
            }
            )
        ];
        const shareData = {
            files: filesArray,
        };
        navigator.share(shareData);
    });
}

document.querySelector(".card").addEventListener("mouseup", _ => {
    shareCard();
})