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
    const container = document.querySelector(".container");
    const card = document.querySelector(".card");
    const cardBackground = card.querySelector(".background");
    const cardBackgroundMask = cardBackground.querySelector(".mask");
    const cardFooter = card.querySelector(".footer");
    const nameInput = card.querySelector(".name input");
    const nameDisplayer = card.querySelector(".name span");
    const characterDisplayer = card.querySelector(".character");
    const characterStats = card.querySelector(".stats");
    const characterTeam = card.querySelector(".team");
    const qlPointsDisplayer = card.querySelector(".ql-points");
    const rankingDisplayer = card.querySelector(".ranking");
    const rockDisplayer = card.querySelector(".stats [data-stat=rock] .value");
    const paperDisplayer = card.querySelector(".stats [data-stat=paper] .value");
    const scissorsDisplayer = card.querySelector(".stats [data-stat=scissors] .value");
    const rockTarget = card.querySelector(".stats [data-stat=rock]");
    const paperTarget = card.querySelector(".stats [data-stat=paper]");
    const scissorsTarget = card.querySelector(".stats [data-stat=scissors]");

    // Vantas
    const wavesContainer = VANTA.WAVES({
        el: container,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 960,
        minWidth: 540,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x6c5855
    });

    const wavesBackground = VANTA.WAVES({
        el: cardBackground,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0xce8d2d
    });

    // Ataques
    const attacks = {
        rock: 0,
        paper: 0,
        scissors: 0,
        max: 100
    };

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
                top: "30px",
                right: "-30px"
            },
            colors: {
                card: '--card-yellow-a',
                footer: '--card-yellow-b',
                cardEffect: 0xce8d2d
            },
            mask: "/assets/images/others/mask/card-mask-yellow.png",
            stats: {
                bottom: "15px"
            }
        },
        {
            url: "/assets/images/characters/jade.png",
            style: {
                left: "-30px",
            },
            colors: {
                card: '--card-red-a',
                footer: '--card-red-b',
                cardEffect: 0xba2626
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
                transform: "rotate(-20deg)",
                top: "66px",
                left: "24px"
            },
            colors: {
                card: '--card-blue-a',
                footer: '--card-blue-b',
                cardEffect: 0x393459,
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
                bottom: "-20px",
                right: "-40px"
            },
            colors: {
                card: '--card-pink-a',
                footer: '--card-pink-b',
                cardEffect: 0xd34c41
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
                bottom: "-102px",
                left: "-46px",
            },
            colors: {
                card: '--card-sky-a',
                footer: '--card-sky-b',
                cardEffect: 0x709aa3
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
                left: "-40px",
                bottom: "0px"
            },
            colors: {
                card: '--card-green-a',
                footer: '--card-green-b',
                cardEffect: 0x5f856f
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
                left: "-20px",
                bottom: "-120px"
            },
            colors: {
                card: '--card-red-a',
                footer: '--card-red-b',
                cardEffect: 0xba2626
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
                left: "-41px",
                bottom: "-91px"
            },
            colors: {
                card: '--card-pink-a',
                footer: '--card-pink-b',
                cardEffect: 0xd34c41
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
                right: "-30px",
                bottom: "-10px"
            },
            colors: {
                card: '--card-green-a',
                footer: '--card-green-b',
                cardEffect: 0x5f856f
            },
            mask: "/assets/images/others/mask/card-mask-green.png",
            stats: {
                top: "45%"
            }
        },
        {
            url: "/assets/images/characters/juanita.png",
            style:{
                bottom: "-15px"
            },
            colors: {
                card: '--card-purple-a',
                footer: '--card-purple-b',
                cardEffect: 0x57698e
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
                left: "-40px",
                bottom: "10px"
            },
            colors: {
                card: '--card-blue-a',
                footer: '--card-blue-b',
                cardEffect: 0x393459
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
                top: "108px",
                left: "-30px"
            },
            colors: {
                card: '--card-green-a',
                footer: '--card-green-b',
                cardEffect: 0x5f856f
            },
            mask: "/assets/images/others/mask/card-mask-green-c.png",
            stats: {
                right: "20px",
                top: "40%"
            }
        },
        {
            url: "/assets/images/characters/matriara.png",
            style: {
                left: "-56px",
                bottom: "-10px"
            },
            colors: {
                card: '--card-red-a',
                footer: '--card-red-b',
                cardEffect: 0xba2626
            },
            mask: "/assets/images/others/mask/card-mask-red-c.png",
            stats: {
                bottom: "5%"
            }
        },
        {
            url: "/assets/images/characters/salfate.png",
            style: {
                right: "-40px",
                bottom: "0"
            },
            colors: {
                card: '--card-blue-a',
                footer: '--card-blue-b',
                cardEffect: 0x57698e
            },
            mask: "/assets/images/others/mask/card-mask-blue-c.png",
            stats: {
                top: "30%"
            }
        },
        {
            url: "/assets/images/characters/miaufin.png",
            style: {
                left: "-25px",
                bottom: "-4px"
            },
            colors: {
                card: '--card-green-a',
                footer: '--card-green-b',
                cardEffect: 0x5f856f
            },
            mask: "/assets/images/others/mask/card-mask-green-b.png",
            stats: {
                top: "30%",
                right: "20px"
            }
        },
        {
            url: "/assets/images/characters/aru.png",
            style: {
                left: "56px",
                top: "132px"
            },
            colors: {
                card: '--card-purple-a',
                footer: '--card-purple-b',
                cardEffect: 0x57698e
            },
            mask: "/assets/images/others/mask/card-mask-purple-c.png",
            stats: {
                bottom: "0"
            }
        },
        {
            url: "/assets/images/characters/remi.png",
            style: {
                left: "6px",
                bottom: "-23px"
            },
            colors: {
                card: '--card-blue-a',
                footer: '--card-blue-b',
                cardEffect: 0x393459
            },
            mask: "/assets/images/others/mask/card-mask-blue-e.png",
            stats: {
                top: "30%"
            }
        },
        {
            url: "/assets/images/characters/haramiyo.png",
            style: {
                left: "-22px",
                top: "155px"
            },
            colors: {
                card: '--card-pink-a',
                footer: '--card-pink-b',
                cardEffect: 0xd34c41
            },
            mask: "/assets/images/others/mask/card-mask-pink-c.png",
            stats: {
                top: "25%",
                right: "20px",
            }
        },
        {
            url: "/assets/images/characters/tesuda.png",
            style: {
                left: "140px",
                top: "144px"
            },
            colors: {
                card: '--card-sky-a',
                footer: '--card-sky-b',
                cardEffect: 0x709aa3
            },
            mask: "/assets/images/others/mask/card-mask-sky-b.png",
            stats: {
                top: "30%"
            }
        },
        {
            url: "/assets/images/characters/zoilah.png",
            style: {
                left: "76px",
                bottom: "-112px"
            },
            colors: {
                card: '--card-yellow-a',
                footer: '--card-yellow-b',
                cardEffect: 0xce8d2d
            },
            mask: "/assets/images/others/mask/card-mask-yellow-b.png",
            stats: {
                bottom: "20px"
            }
        },
        {
            url: "/assets/images/characters/rafaelbudu.png",
            style: {
                right: "-70px",
                top: "140px"
            },
            colors: {
                card: '--card-red-a',
                footer: '--card-red-b',
                cardEffect: 0x393459
            },
            mask: "/assets/images/others/mask/card-mask-blue-d.png",
            stats: {
                top: "25%"
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

        // Mostrar card
        card.classList.remove("show");
        void card.offsetWidth;
        card.classList.add("show");

        // Estilo card
        cardBackground.style.backgroundColor = `var(${selectedCharacter.colors.card})`;
        cardFooter.style.backgroundColor = `var(${selectedCharacter.colors.footer})`;

        // Efecto
        wavesBackground.setOptions({ color: selectedCharacter.colors.cardEffect });
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

    // Ataques
    const attacksUpdate = (rock = 0, paper = 0, scissors = 0, save = true) => {
        if((rock + paper + scissors) > attacks.max) return;
        rockDisplayer.dataset.text = ("00" + rock).slice( `${rock}`.length > 2? -3 : -2 );
        paperDisplayer.dataset.text = ("00" + paper).slice( `${paper}`.length > 2? -3 : -2 );
        scissorsDisplayer.dataset.text = ("00" + scissors).slice( `${scissors}`.length > 2? -3 : -2 );

        // Determinar equipo
        const team = ( _ => {
            const candidates = [{name: "rock", value: rock }, {name: "paper", value: paper }, {name: "scissors", value: scissors }].sort((a,b) => b.value - a.value);
            return candidates[0];
        })();
        Localization.GetTranslate("main", "team", [ Localization.GetTranslate("main",team.name) ], characterTeam, "data-text");

        // Actualizar valores locales
        attacks.rock = rock;
        attacks.paper = paper;
        attacks.scissors = scissors;

        if(save){
            setPlayerData("rock", rock);
            setPlayerData("paper", paper);
            setPlayerData("scissors", scissors);
        }
    }

    const attacksRandom = _ => {
        let randomRock = Math.floor(Math.random() * attacks.max) + 1;
        let randomPaper = Math.floor(Math.random() * ( attacks.max - randomRock ) ) + 1;
        let randomScissors = Math.floor(Math.random() * ( attacks.max - randomRock - randomPaper )) + 1;

        // Revisar y sumar al que tiene menos
        if((randomRock + randomPaper + randomScissors) < attacks.max){
            const diff = attacks.max - (randomRock + randomPaper + randomScissors);
            const poorest = ( _ => {
                const candidates = [{name: "rock", value: randomRock }, {name: "paper", value: randomPaper }, {name: "scissors", value: randomScissors }].sort((a,b) => a.value -b.value);
                return candidates[0];
            })();
            switch( poorest.name ){
                case "rock":
                    randomRock += diff;
                    break;
                case "paper":
                    randomPaper += diff;
                    break;
                case "scissors":
                    randomScissors += diff;
                    break;
            }
        }

        attacksUpdate(randomRock, randomPaper, randomScissors);
    }

    const attacksInit = (rock = null, paper = null, scissors = null) => {
        if(rock != null && paper != null && scissors != null) attacksUpdate(rock, paper, scissors, false);
        else attacksRandom();
    };

    const attackSum = (attack) => {
        const currentSum = attacks.rock + attacks.paper + attacks.scissors;
        switch(attack){
            case "rock":
                if(attacks.scissors > 1){
                    attacks.rock += 1;
                    if( (attacks.rock + attacks.paper + attacks.scissors) > attacks.max) attacks.scissors -= 1;
                }
                break;
            case "paper":
                if(attacks.rock > 1){
                    attacks.paper += 1;
                    if( (attacks.rock + attacks.paper + attacks.scissors) > attacks.max) attacks.rock -= 1;
                }
                break;
            case "scissors":
                if(attacks.paper > 1){
                    attacks.scissors += 1;
                    if( (attacks.rock + attacks.paper + attacks.scissors) > attacks.max) attacks.paper -= 1;
                }
                break;
        }
        attacksUpdate(attacks.rock, attacks.paper, attacks.scissors);
    };

    // Compartir card
    const shareCard = async _ => {
        // Remover animacion
        card.classList.remove("show");

        html2canvas(container, {width: 540, windowWidth: 540, height: 960, windowHeight: 960, backgroundColor: "#4cbcf8", allowTaint: true, useCORS: true, ignoreElements: element => {
            if(element.classList.contains("changers")) return true;
        }}).then(async (canvas) => {
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
            const text = Localization.GetTranslate("main","shareText");
            const shareData = {
                title: "JanKenCard!",
                text: text,
                url: "https://card.jankenup.com/",
                files: filesArray
            };
            navigator.clipboard.writeText(text);
            navigator.share(shareData);
        });
    }

    /** Botones */
    document.querySelector("[data-action=change]").addEventListener("click", _ => { characterIndexUpdate(); attacksRandom(); });
    document.querySelector("[data-action=share]").addEventListener("click", _ => {
        shareCard();
    })
    rockTarget.addEventListener("click", _ => { attackSum("rock"); });
    paperTarget.addEventListener("click", _ => { attackSum("paper"); });
    scissorsTarget.addEventListener("click", _ => { attackSum("scissors"); });

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
    attacksInit(originalPlayerData.rock, originalPlayerData.paper, originalPlayerData.scissors);
})();