import { useContext } from "react";
import { CustAPI } from "./Customizacoes"
import Definicoes from "./Definicoes";
import { ContextoGlobal } from "../contexts/variaveisGlobais";


export async function ListarEventoPorId(id, setConteudoDaTela){
    if(id){
        let eventoProv = await FetchApi.consultaGet('/eventos/'+id);
        if(eventoProv.resultado === false){
            setConteudoDaTela({conteudo: undefined, mensagemDeTopo: 'Erro na conexão com o servidor'});
            
        }else{
            setConteudoDaTela({conteudo: eventoProv.evento, mensagemDeTopo: 'Exibindo evento ' +  id});
        }
    }
}

function isJSONString(str) {
    try {
        JSON.parse(str);
        return true; // A string é um JSON válido
    } catch (e) {
        return false; // A string não é um JSON válido
    }
}

function verificarSeCorreta(endereco, parametro){
    if(parametro.slice(0,1) !== '/'){
        parametro = '/' + parametro;
    }
    return(endereco+parametro);
}

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
                headers: {
                          'Content-Type': 'application/json',
                          'Accept': 'application/json'
                        },
                body: dados
            });
            resposta = (await resposta).json()
                .then((res) => {
                    return res;
            }); 
            return(await resposta);
        }catch(error){
            return({resultado: false, error});
        }
        
    },edicaoPostComArquivo: async function(rest, formData){
        try {
            let response = await fetch(Definicoes.enderecoAPI+rest, {
                method: 'POST',
                body: formData,
            });
            response = (response).json()
                .then((res) => {
                    return res;
            });
            return response;
            } catch (error) {
            console.error('Ocorreu o seguinte erro:', error);
            return error;
            }
    },
    edicaoPut: async function(rest, formData){
        try {
            let stringURL = verificarSeCorreta(CustAPI.endereco, rest)
            let response = await fetch(stringURL, {
                method: 'PUT',
                body: formData,
            });
            response = (response).json()
                .then((res) => {
                    return res;
            });
            return response;
            } catch (error) {
            console.error('Ocorreu o seguinte erro:', error);
            return error;
        }
    },
    edicaoPutSemArquivo: async function(rest, dados){
        try{
            let stringURL = verificarSeCorreta(CustAPI.endereco, rest);
            let resposta = fetch(stringURL,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });
            resposta = (await resposta).json()
                .then((res) => {
                    return res;
            }); 
            return(await resposta);
        }catch(error){
            return({resultado: false, error});
        }
        
    }         
}
