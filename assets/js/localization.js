class Localization{

    // Idiomas validos
    static validLanguage = [ "en", "es", "ja", "fr", "it", "ru" ];
    static allowedCompoundLanguage = [ "es-cl" ];

    // Main
    static Main(){

        return {

            en: {
                name: "Name",
                team: "Team {0}",
                rock: "Rock",
                paper: "Paper",
                scissors: "Scissors",
                shareText: "This is my JanKenUP card! Create yours at https://card.jankenup.com",
                title: "JanKenUp! Card",
                pageTitle: "JanKenUp! Card - Humita Games",
                pageDescription: "Create your own JanKenUP card!",
                share: "Share",
                random: "Random",
                next: "Next",
                prev: "Previous",
                background: "Toggle FX",
                legend: "Customize your player card. Write your name, distribute attack points, and choose your main character. Share it on your social media and invite your friends to create theirs!"
            },

            es: {
                name: "Nombre",
                rock: "Piedra",
                paper: "Papel",
                scissors: "Tijeras",
                shareText: "Esta es mi carta de JanKenUP! Crea la tuya en https://card.jankenup.com",
                title: "Carta JanKenUp!",
                pageTitle: "Carta JanKenUp! - Humita Games",
                pageDescription: "¡Crea tu propia carta de JanKenUP!",
                share: "Compartir",
                random: "Al azar",
                team: "Equipo {0}",
                next: "Anterior",
                prev: "Siguiente",
                background: "Alternar FX",
                legend: "Personaliza tu carta de jugador. Escribe tu nombre, distribuye puntos de ataque y elige a tu personaje principal. ¡Compártelo en tus redes e invita a tus amigos a crear las suyas!"
            },

            ja: {
                name: "名前",
                team: "{0}団",
                rock: "グー",
                paper: "パー",
                scissors: "チョキ",
                title: "JanKenUP！ カード",
                shareText: "これは私のJanKenUPカードです！https://card.jankenup.com であなたのカードを作成してください。",
                pageTitle: "JanKenUP！ カード - Humita ゲーム",
                pageDescription: "自分だけのJanKen UPカードを作ろう！",
                share: "共有",
                random: "ランダム",
                next: "次",
                prev: "前",
                background: "FXトグル",
                legend: "プレイヤーカードをカスタマイズしましょう。お名前を書き込み、攻撃ポイントを配分し、メインキャラクターを選びましょう。それをSNSで共有し、友達にも作成するように招待しましょう！"
            }

        }

    }

    // Solicitar un texto para incluir
    static GetTranslate( page, key, values, element, attributeTarget ){
        
        let language = navigator.language.toLowerCase();

        // Permitiremos ciertos lenguajes con su codigo completo
        if( Localization.allowedCompoundLanguage.indexOf(language) == -1 ) language = language.split("-")[0];
        if( Localization.validLanguage.indexOf(language) == -1 ) language = Localization.validLanguage[0]; 
        
        let string = "";
        values = values? (Array.isArray(values)? values : values.split(",")) : [];
        const withArguments = values.length > 0;

        switch(page){

            case "main":
                string = Localization.Main()[language][ key ];
                break;
        }

        // Contiene argumentos para reemplazar
        if(withArguments){

            for(let i = 0; i < values.length; i++){
                string = string.replace(`{${i}}`, values[i]);
            }

        }
        
        if(string){
            if(element){
                if(attributeTarget) element.setAttribute( attributeTarget, string);
                else element.innerHTML = string;
            }   
        }

        return string? string : ''; 
    }

}

// Procesar todas los textos que necesiten localizacion
const needLocalization = Array.from( document.querySelectorAll( "[data-localization-key]" ) );
for( const e of needLocalization ){
    Localization.GetTranslate(e.dataset.localizationPage, e.dataset.localizationKey, e.dataset.localizationArguments, e, e.dataset.localizationAttribute);
}