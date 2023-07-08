class Localization{

    // Idiomas validos
    static validLanguage = [ "en", "es", "ja", "fr", "it", "ru" ];
    static allowedCompoundLanguage = [ "es-cl" ];

    // Main
    static Main(){

        return {

            en: {
                name: "Name",
                share: "Share",
                change: "Change",
                team: "Team {0}",
                rock: "Rock",
                paper: "Paper",
                scissors: "Scissors"
            },

            es: {
                name: "Nombre",
                share: "Compartir",
                change: "Cambiar",
                team: "Equipo {0}",
                rock: "Piedra",
                paper: "Papel",
                scissors: "Tijeras"
            },

            ja: {
                name: "名前",
                share: "共有",
                change: "ランダム",
                team: "{0}団",
                rock: "グー",
                paper: "パー",
                scissors: "チョキ"
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