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

// Elementos comunes
const card = document.querySelector(".card");
const cardBackground = card.querySelector(".background");
const cardFooter = card.querySelector(".footer");

// Cambio de nombre
const nameInput = document.querySelector(".card .name input");
const nameDisplayer = document.querySelector(".card .name span");
const changeName = name => {
    nameDisplayer.dataset.text = name;
}
nameInput.addEventListener("keydown", e => {
    if(e.code == "Space") e.preventDefault();
});
nameInput.addEventListener("input", e => {
    if(nameInput.value.length >= nameInput.getAttribute("maxlength")){
        nameInput.value = nameInput.value.substring(0, nameInput.getAttribute("maxlength"));
    }
    changeName(nameInput.value);
});

// Cambio de personaje
const characters = [
    {
        url: "/assets/images/characters/ryusei.png",
        style: {
            width: "96%",
            top: "-10px",
            right: "-30px"
        },
        colors: {
            card: '--card-yellow-a',
            footer: '--card-yellow-b'
        }
    },
    {
        url: "/assets/images/characters/jade.png",
        style: {
            width: "96%",
            right: "-30px"
        },
        colors: {
            card: '--card-orange-a',
            footer: '--card-orange-b'
        }
    },
    {
        url: "/assets/images/characters/oriax.png",
        style: {
            width: "41%",
            transform: "rotate(-20deg)",
            top: "69px",
            left: "100px"
        },
        colors: {
            card: '--card-blue-a',
            footer: '--card-blue-b'
        }
    },
    {
        url: "/assets/images/characters/sakura.png",
        style: {
            width: "110%",
            bottom: "40px",
            right: "-40px"
        },
        colors: {
            card: '--card-pink-a',
            footer: '--card-pink-b'
        }
    },
    {
        url: "/assets/images/characters/joaquin.png",
        style: {
            width: "93%",
            top: "50px",
            left: "-2px",
            transform: "rotate(-15deg)"
        },
        colors: {
            card: '--card-sky-a',
            footer: '--card-sky-b'
        }
    },
    {
        url: "/assets/images/characters/airini.png",
        style: {
            width: "100%",
            left: "-40px"
        },
        colors: {
            card: '--card-gray-a',
            footer: '--card-gray-b'
        }
    },
    {
        url: "/assets/images/characters/barry.png",
        style: {
            width: "74%",
            right: "76px"
        },
        colors: {
            card: '--card-orange-a',
            footer: '--card-orange-b'
        }
    },
    {
        url: "/assets/images/characters/misae.png",
        style: {
            width: "92%",
            right: "76px"
        },
        colors: {
            card: '--card-pink-a',
            footer: '--card-pink-b'
        }
    },
    {
        url: "/assets/images/characters/matsuo.png",
        style: {
            width: "92%",
            right: "-40px"
        },
        colors: {
            card: '--card-green-a',
            footer: '--card-green-b'
        }
    },
    {
        url: "/assets/images/characters/juanita.png",
        style:{
            width: "65%",
            left: "-30px"
        },
        colors: {
            card: '--card-purple-a',
            footer: '--card-purple-b'
        }
    },
    {
        url: "/assets/images/characters/duo.png",
        style:{
            width: "96%",
            left: "-50px",
            bottom: "-10px"
        },
        colors: {
            card: '--card-blue-a',
            footer: '--card-blue-b'
        }
    },
    {
        url: "/assets/images/characters/arataka.png",
        style: {
            width: "80%",
            top: "0",
            right: "-40px"
        },
        colors: {
            card: '--card-gray-a',
            footer: '--card-gray-b'
        }
    }
];
const characterDisplayer = document.querySelector(".card .character");
let characterIndex = 0;
const characterIndexUpdate = (direction = 1) => {
    characterIndex += direction > 0? 1 : -1;
    if(characterIndex >= characters.length) characterIndex = 0;
    else if(characterIndex < 0) characterIndex = characters.length - 1;
    characterUpdate();
}
const characterUpdate = _ => {
    const selectedCharacter = characters[characterIndex];
    lazyLoad.preload( selectedCharacter.url, characterDisplayer, "img" );
};
characterDisplayer.addEventListener("lazyLoad", _ => {
    const selectedCharacter = characters[characterIndex];
    
    // Cambios de estilo
    let style = "";
    for(let prop in selectedCharacter.style){
        style = `${style} ${prop}: ${selectedCharacter.style[prop]};`;
    }
    characterDisplayer.style = style;

    // Estilo card
    cardBackground.style.backgroundColor = `var(${selectedCharacter.colors.card})`;
    cardFooter.style.backgroundColor = `var(${selectedCharacter.colors.footer})`;
});

// Primera carga
characterUpdate();

// Compartir card
const shareCard = async _ => {
    var card = document.querySelector(".container");
    html2canvas(card, {windowWidth: 540, windowHeight: 960, backgroundColor: "#4cbcf8", allowTaint: true, useCORS: true}).then(async (canvas) => {
        // TODO: Descargar imagen si no puede compartir
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

/** Botones */
document.querySelector("[data-action=change]").addEventListener("click", _ => { characterIndexUpdate(); });
document.querySelector("[data-action=share]").addEventListener("click", _ => {
    shareCard();
})