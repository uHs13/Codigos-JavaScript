class HttpRequest{
   
    static request(method,url,params={}){

        return new Promise((resolve,reject)=>{

                 //criando o objeto Ajax
         let ajax = new XMLHttpRequest();

         //indicamos qual o método usar e onde fazer a requisição dos dados
         ajax.open(method.toUpperCase(),url);
            
        ajax.onerror = event =>{

            reject (e);

        }//fim onerror


         //após configurar temos que implementar um evento de resposta ( callback) porque não sabemos quanto tempo vai levar pro Ajax pegar as informações
         //ajax.onload -> quando terminou de carregar
         ajax.onload = event =>{//callback
 
             let responseJson = {}
 
             try{
 
                 //atributo que guarda a informação retornada pelo servidor
                  responseJson = JSON.parse(ajax.responseText);
 
 
             } catch (e){

                 reject(e);
                 console.error(e);
 
             }
            

             resolve(responseJson);
 
         };//fim ajax.onload
         
         ajax.setRequestHeader('Content-Type','application/json');

         ajax.send(JSON.stringify(params));//send do ajax só manda texto
 

        });//fim Promise
        


    }//fim request()
 
    
    static get(url,params={}){

        return HttpRequest.request('GET',url,params);


    }
    
    static post(url,params={}){

        return HttpRequest.request('POST',url,params);


    }

    static put(url,params={}){

        return HttpRequest.request('PUT',url,params);


    }

    static delete(url,params={}){

        return HttpRequest.request('DELETE',url,params);


    }










}