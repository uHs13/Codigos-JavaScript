class Ajax {

    static transfer(url, method = "GET", formData = new FormData(), onLoadStart = () =>{}, onProgress= () =>{}, ) {

        return new Promise((resolve, reject) => {

            //Para cada promessa ( Arquivo sendo enviado ao servidor ) vamos fazer uma solicitação ajax
            let ajax = new XMLHttpRequest();

            ajax.open(method, url); //Abrimos a conexão via POST na rota /upload

            //Evento que é chamado quando o ajax termina de ser enviado
            ajax.onload = event => {

                try {
                    //ajax.responseText armazena a resposta enviada pelo servidor 
                    resolve(JSON.parse(ajax.responseText));

                } catch (e) {// caso não venha um json válido. Erro na resposta do servidor, a requisição foi enviada e o servidor respondeu com erro

                    reject(e);

                }

            };//fim ajax.onload

            //evento chamado durante a atualização do progresso do upload
            ajax.upload.onprogress = onProgress;

            //evento que é chamado caso ocorra algum erro no envio do ajax
            ajax.onerror = event => {

                reject(event);

            };//fim ajax.onerror

           onLoadStart();

            ajax.send(formData);

        });
        //.Promise

    }
    //.transfer

}
//.Ajax