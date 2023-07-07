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
const shareCard = _ => {
    var card = document.querySelector("body");
    html2canvas(card, {windowWidth: 540, windowHeight: 960, backgroundColor: null}).then((canvas) => {
        //var link = document.createElement("a");
        //document.body.appendChild(link);

        

        shareFile(dataURItoBlob(canvas.toDataURL()), "JanKenUP! Card");
        
        //link.download = "html_image.jpg";
        //link.href = canvas.toDataURL();
        //link.target = '_blank';
        //link.click();
    });
}

const dataURLtoFile = (dataURI) => {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type:mimeString});
};

const shareFile = (file, title, text) => {
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator
        .share({
            files: [file],
            title,
            text
        })
        .then(() => console.log("Share was successful."))
        .catch((error) => console.log("Sharing failed", error));
    } else {
        console.log(`Your system doesn't support sharing files.`);
    }
};

document.querySelector(".card").addEventListener("mouseup", _ => {
    shareCard();
})