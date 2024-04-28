import {useContext, useEffect} from 'react';
import { useParams } from 'react-router-dom';

import { ContextoGlobal } from '../../../contexts/variaveisGlobais';
import { FetchApi } from '../../../Controller/FetchApi';
import CelulaEvento from '../CelulaEventos';

function dataProximos15Dias(){
    let hoje = new Date();
    let hojems = hoje.getTime();
    let msEm15Dias = 15 * 24 * 60 * 60 * 1000;
    let DaquiA15Diasms = msEm15Dias + hojems;
    let DataDaquiA15Dias = new Date(DaquiA15Diasms);
    return DataDaquiA15Dias.getDate() +'/'+ String(parseInt(DataDaquiA15Dias.getMonth())+1) +'/'+ DataDaquiA15Dias.getFullYear();
}


const MensagemDeTopo = (props) => {
    return(
        <center>{props.mensagemDeTopo}</center>
    )
}


function TelaEventos(){

    const {conteudoDaTela, setConteudoDaTela, eventos, setEventos} = useContext(ContextoGlobal);
    const {id} = useParams();

    function montarExibicaoEventos(eventosRecebidos){
        /*
        let eventosMontados = eventosRecebidos?.((evento) => {
            return(<CelulaEvento evento = {evento}/>)
        })*/
    }

    useEffect(() => {
        async function listarEventos(){
            let eventoProv = null;
            if(id){
                eventoProv = await FetchApi.consultaGet('/eventos/'+id);
                if(eventoProv.resultado === false){
                    setConteudoDaTela({conteudo: undefined, mensagemDeTopo: 'Erro na conexão com o servidor'});
                    console.log(conteudoDaTela);
                }else{
                    setEventos(eventoProv.evento);
                    setConteudoDaTela({conteudo: eventoProv.evento, mensagemDeTopo: 'Exibindo evento' +  id});
                }
            }else{
                eventoProv = await FetchApi.consultaGet('/eventos');
                if(eventoProv.resultado === false){
                    setConteudoDaTela({conteudo: undefined, mensagemDeTopo: 'Erro na conexão com o servidor'});
                }else{
                    setEventos(eventoProv.evento);
                    setConteudoDaTela({conteudo: eventoProv.evento, mensagemDeTopo: 'Exibindo eventos até dia ' +  dataProximos15Dias()});
                }   
            }
                    
        }      
        listarEventos();

    }, []);
    
    return(
        <div className='containerEventos'>
            < MensagemDeTopo mensagemDeTopo={ conteudoDaTela.mensagemDeTopo } />
            <div className='listaResponsiva center'>
                {conteudoDaTela.conteudo && conteudoDaTela.conteudo.map?
                conteudoDaTela.conteudo.map((evento, indice) => {
                    return(
                        <CelulaEvento evento={evento} indice={indice} key={indice}/>
                    )
                }):
                ''}
            </div>
            
        </div>
    );
}

export default TelaEventos;