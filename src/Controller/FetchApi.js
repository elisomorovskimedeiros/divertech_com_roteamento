import { CustAPI } from "./Customizacoes"
import Definicoes from "./Definicoes";



export const FetchApi = {
    //consulta(parametros rest no servidor)
    consultaGet: async function(rest){
        try{
            let resposta = fetch(CustAPI.endereco + rest)
            .then((res) => {
                return res;
            });
            resposta = (await resposta).json()
                .then((res) => {
                    return res;
            }); 
            return(await resposta);
        }catch(error){
            return({resultado: false});
        }
        
    },
    insercaoPost: async function(rest, dados){
        try{
            let resposta = fetch(CustAPI.endereco + rest,{
                method: 'POST',
                body: JSON.stringify(dados),
                headers: Definicoes.headers
            });
            resposta = (await resposta).json()
                .then((res) => {
                    return res;
            }); 
            return(await resposta);
        }catch(error){
            return({resultado: false});
        }
        
    }       
}