class Utils 
{

    static addEventListenerAll(element, events,func)
    {

        events.split(' ').forEach(event => {
            
            element.addEventListener(event,func,false);

        });

    }
    //.addEventListenerAll

    static swapbutton(btn, bool =  true) {
        
        btn.disabled = bool;

    }
    //.swapbutton

    static hideButtons(list) {

        [...list].forEach(btn => {

            btn[0].style.display = (btn[1] === true) ? "none" : "block";

        });

    }
    //.hideButtons
    
    static formatTime(forecast) {

        /* Pegamos o resto da divisão para o resultado não passar de 60 */
        let seconds = parseInt((forecast / 1000) % 60);

        let minutes = parseInt((forecast / (1000 * 60)) % 60);

        let hours = parseInt((forecast / (1000 * 360)) % 24);

        if (hours > 0) {

            return `${hours} horas, ${minutes} minutos e ${seconds} segundos`;

        } else if (minutes > 0) {

            return `${minutes} minutos e ${seconds} segundos`;

        } else if (seconds > 0) {

            return `${seconds} segundos`

        } else {

            return 0;

        }

    }
    //.formatTime

}