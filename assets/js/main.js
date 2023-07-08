( _ => {
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
    const cardBackgroundMask = cardBackground.querySelector(".mask");
    const cardFooter = card.querySelector(".footer");
    const nameInput = card.querySelector(".name input");
    const nameDisplayer = card.querySelector(".name span");
    const characterDisplayer = card.querySelector(".character");
    const characterStats = card.querySelector(".stats");
    const qlPointsDisplayer = card.querySelector(".ql-points");
    const rankingDisplayer = card.querySelector(".ranking");

    // Cambio de nombre
    const changeName = (name, save = true) => {
        nameDisplayer.dataset.text = name;
        if(save) setPlayerData("name",name);
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
                width: "90%",
                top: "30px",
                right: "-30px"
            },
            colors: {
                card: '--card-yellow-a',
                footer: '--card-yellow-b'
            },
            mask: "/assets/images/others/mask/card-mask-yellow.png",
            stats: {
                bottom: "15px"
            }
        },
        {
            url: "/assets/images/characters/jade.png",
            style: {
                width: "91%",
                left: "-30px"
            },
            colors: {
                card: '--card-red-a',
                footer: '--card-red-b'
            },
            mask: "/assets/images/others/mask/card-mask-red.png",
            stats: {
                right: "20px",
                top: "45%"
            }
        },
        {
            url: "/assets/images/characters/oriax.png",
            style: {
                width: "41%",
                transform: "rotate(-20deg)",
                top: "69px",
                left: "46px"
            },
            colors: {
                card: '--card-blue-a',
                footer: '--card-blue-b'
            },
            mask: "/assets/images/others/mask/card-mask-blue.png",
            stats: {
                right: "20px",
                top: "45%"
            }
        },
        {
            url: "/assets/images/characters/sakura.png",
            style: {
                width: "110%",
                bottom: "0px",
                right: "-40px"
            },
            colors: {
                card: '--card-pink-a',
                footer: '--card-pink-b'
            },
            mask: "/assets/images/others/mask/card-mask-pink.png",
            stats: {
                right: "20px",
                top: "40%"
            }
        },
        {
            url: "/assets/images/characters/joaquin.png",
            style: {
                width: "86%",
                bottom: "-86px",
                left: "-46px",
            },
            colors: {
                card: '--card-sky-a',
                footer: '--card-sky-b'
            },
            mask: "/assets/images/others/mask/card-mask-sky.png",
            stats: {
                right: "20px",
                bottom: "50%",
                top: "50%"
            }
        },
        {
            url: "/assets/images/characters/airini.png",
            style: {
                width: "97%",
                left: "-40px"
            },
            colors: {
                card: '--card-gray-a',
                footer: '--card-gray-b'
            },
            mask: "/assets/images/others/mask/card-mask-gray.png",
            stats: {
                right: "20px",
                top: "40%"
            }
        },
        {
            url: "/assets/images/characters/barry.png",
            style: {
                width: "72%",
                left: "-20px"
            },
            colors: {
                card: '--card-red-a',
                footer: '--card-red-b'
            },
            mask: "/assets/images/others/mask/card-mask-red-b.png",
            stats: {
                right: "20px",
                top: "45%"
            }
        },
        {
            url: "/assets/images/characters/misae.png",
            style: {
                width: "83%",
                left: "-41px",
                bottom: "-91px"
            },
            colors: {
                card: '--card-pink-a',
                footer: '--card-pink-b'
            },
            mask: "/assets/images/others/mask/card-mask-pink-b.png",
            stats: {
                right: "20px",
                top: "30%"
            }
        },
        {
            url: "/assets/images/characters/matsuo.png",
            style: {
                width: "88%",
                right: "-30px"
            },
            colors: {
                card: '--card-green-a',
                footer: '--card-green-b'
            },
            mask: "/assets/images/others/mask/card-mask-green.png",
            stats: {
                top: "45%"
            }
        },
        {
            url: "/assets/images/characters/juanita.png",
            style:{
                width: "61%"
            },
            colors: {
                card: '--card-purple-a',
                footer: '--card-purple-b'
            },
            mask: "/assets/images/others/mask/card-mask-purple.png",
            stats: {
                right: "20px",
                top: "45%"
            }
        },
        {
            url: "/assets/images/characters/duo.png",
            style:{
                width: "86%",
                left: "-40px",
                bottom: "10px"
            },
            colors: {
                card: '--card-blue-a',
                footer: '--card-blue-b'
            },
            mask: "/assets/images/others/mask/card-mask-blue-b.png",
            stats: {
                right: "20px",
                top: "30%"
            }
        },
        {
            url: "/assets/images/characters/arataka.png",
            style: {
                width: "72%",
                top: "108px",
                left: "-30px"
            },
            colors: {
                card: '--card-gray-a',
                footer: '--card-gray-b'
            },
            mask: "/assets/images/others/mask/card-mask-gray-b.png",
            stats: {
                right: "20px",
                top: "40%"
            }
        }
    ];

    let characterIndex = 0;
    const characterIndexUpdate = (direction = 1, save = true) => {
        characterIndex += direction > 0? 1 : -1;
        if(characterIndex >= characters.length) characterIndex = 0;
        else if(characterIndex < 0) characterIndex = characters.length - 1;
        if(save) setPlayerData("character", characterIndex);
        characterUpdate();
        staticticsRandom();
    }
    const characterIndexSet = (index = 0, save = true) => {
        if(index < 0 || index >= characters.length ) return;
        characterIndex = index;
        if(save) setPlayerData("character", characterIndex);
        characterUpdate();
    }

    const characterUpdate = _ => {
        const selectedCharacter = characters[characterIndex];
        lazyLoad.preload( selectedCharacter.url, characterDisplayer, "img" );
        lazyLoad.preload( selectedCharacter.mask, cardBackgroundMask, "background" );
    };
    characterDisplayer.addEventListener("lazyLoad", _ => {
        const selectedCharacter = characters[characterIndex];
        
        // Cambios de estilo
        let style = "";
        for(let prop in selectedCharacter.style){
            style = `${style} ${prop}: ${selectedCharacter.style[prop]};`;
        }
        characterDisplayer.style = style;

        // Estilos stats
        let statsStyle = "";
        for(let prop in selectedCharacter.stats){
            statsStyle = `${statsStyle} ${prop}: ${selectedCharacter.stats[prop]};`;
        }
        characterStats.style = statsStyle;

        // Estilo card
        cardBackground.style.backgroundColor = `var(${selectedCharacter.colors.card})`;
        cardFooter.style.backgroundColor = `var(${selectedCharacter.colors.footer})`;
    });

    // Datos de ranking y QLpoints
    const statisticsUpdate = (qlPoints = null, ranking = null, save = true) => {
        qlPointsDisplayer.innerHTML = ("000" + qlPoints).slice(-4);
        rankingDisplayer.dataset.text = `#${ranking}`;
        if(save){
            setPlayerData("qlPoints", qlPoints);
            setPlayerData("ranking", ranking);
        }
    }

    const staticticsRandom = _ => {
        const qlPoints = Math.floor(Math.random() * 9999).toString();
        const ranking = Math.floor(Math.random() * 9999).toString();
        statisticsUpdate(qlPoints, ranking);
    }

    const staticticsInit = (qlPoints = null, ranking = null) => {
        if(qlPoints && ranking) statisticsUpdate(qlPoints, ranking, false);
        else staticticsRandom();
    };

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

    // Obtencion y guardado de datos
    const setPlayerData = (key, value) => {
        const playerData = getPlayerData();
        playerData[key] = value;
        localStorage.setItem("playerData", JSON.stringify(playerData));
    };

    const getPlayerData = (key = null, defaultValue = null) => {
        const playerData = JSON.parse(localStorage.getItem("playerData")) || {};
        return key? ( playerData[ key ] || defaultValue ) : playerData;
    };

    // Completar los datos iniciales del jugador
    const originalPlayerData = getPlayerData();
    nameInput.value = originalPlayerData.name || "";
    changeName(originalPlayerData.name || "", false);
    characterIndexSet(originalPlayerData.character, false);
    staticticsInit(originalPlayerData.qlPoints, originalPlayerData.ranking);
})();