class HttpRequest {


    static request(method, url, params = {}) {

        return new Promise((resolve, reject) => {

            let ajax = new XMLHttpRequest();

            ajax.open(method.toUpperCase(), url);//ajax solicita os dados da rota passada. No caso é a rota /user do client ( essa rota vai no servidor restul para pegar os dados dos usuários )


            ajax.onerror = event =>{

                reject(event);

            };

            //temos que configurar um evento de resposta ( callback ) porque não sabemos quanto tempo vai levar pra solicitação ao servidor ser concluida
            //ajax.onload -> quando ele está pronto, conseguiu carregar o que foi pedido
            ajax.onload = event => {


                let obj = {};

                try {
                    //atributo que armazena as informações retornadas pelo servidor
                    obj = JSON.parse(ajax.responseText);

                } catch (e) {

                    reject(e);
                    console.error(e);
                    
                }

                resolve(obj); 


            };

            ajax.setRequestHeader('Content-Type','application/json');

            ajax.send(JSON.stringify(params));


        });//fim promise

    }//fim request

    static get(url, params = {}){

           return HttpRequest.request('GET', url, params);

    }

    static delete(url, params = {}){

           return HttpRequest.request('DELETE', url, params);

    }

    static put(url, params = {}){

           return HttpRequest.request('PUT', url, params);

    }

    static post(url, params = {}){

            console.log('HttpRequest.request("POST", url, params);');
           return HttpRequest.request('POST', url, params);

    }

}