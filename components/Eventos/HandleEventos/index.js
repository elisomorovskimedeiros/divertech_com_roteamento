
//icons
import * as FaIcons from "react-icons/fa";


import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { ContextoGlobal } from '../../../contexts/variaveisGlobais';
import { FetchApi } from "../../../Controller/FetchApi";
import { verificarDataMaisAntiga, transformarDataDBParaDataPortugues } from "../../../Controller/funcoesVariadas";

const FaPlus = <FaIcons.FaPlus size = {40}/>
const FaChevronDown = <FaIcons.FaChevronDown size = {40} />
const FaChevronRight = <FaIcons.FaChevronRight size = {40} />
const FaLink = <FaIcons.FaLink size = {40} />
const FaArrowAltCircleRight = <FaIcons.FaArrowAltCircleRight size = {40} />


function HandleEventos(){
    
    const [campoDeBusca, setCampoDeBusca] = useState('');
    const [dataDe, setDataDe] = useState('');
    const [dataAte, setDataAte] = useState('');

   

    const { setConteudoDaTela, eventos, setEventos } =  useContext(ContextoGlobal);
    const navigate = useNavigate();

    /* useEffect(() => {
        function dispararBuscaDeEvento(){
            if(id){
                    let obj = {target: {value: id}}
                    buscar(obj);
            }
        }
        dispararBuscaDeEvento();
    }, []); */

    function InsercaoNovoEvento(){

        function handleAberturaNovoEvento(){
            //props.gerarNovoEvento(); 
            //props.fecharOpcoesEventos(0);
        }

        return(
            <div className= 'btnNovoEvento espacoDireita linkFake'  onClick={handleAberturaNovoEvento} id='divBotaoAddEvento'>
                <Link to={'/eventos/new'} className='flexNaoResponsivo campoDestacado justifyContentBetween '>
                    <div>
                        {FaPlus}
                    </div>
                    <div className='espacoEsquerda'>
                            Adicionar novo evento
                    </div>
                </Link>
                <div className='flexNaoResponsivo campoDestacado espacoAntes justifyContentBetween '>
                    <div>
                        {FaLink}
                    </div>
                    <div className='espacoEsquerda'>
                        Link de Cadastro
                    </div>
                </div>
            </div>
        )
    }

    function inserirResultado(eventoProv, valorParaBusca){
        if(eventoProv.hasOwnProperty('evento') && eventoProv.evento !== null){
            if(eventoProv.evento.length && eventoProv.evento[0].id_evento){
                setEventos(eventoProv.evento);
                setConteudoDaTela({
                    mensagemDeTopo: valorParaBusca,
                    conteudo: eventoProv.evento
                });
            }else{
                setConteudoDaTela({
                    mensagemDeTopo: 'nada encontrado '+ valorParaBusca? valorParaBusca: '',
                    conteudo: []
                });
            }
        }else if(eventoProv.hasOwnProperty('erro')){
            setConteudoDaTela({
                mensagemDeTopo: eventoProv.erro,
                conteudo: []
            });
        }else{
            setConteudoDaTela({
                mensagemDeTopo: 'Nada encontrado ' + valorParaBusca? valorParaBusca: '',
                conteudo: []
            });
        }
    }

    function ComponenteBuscaPorData(props){
        const [dataDe, setDataDe] = useState('');
        const [dataAte, setDataAte] = useState('');

        async function manipuladorDeData(){
            let dataDe = document.getElementById('dataDe').value;
            setDataDe(dataDe);
            let dataAte = document.getElementById('dataAte').value;
            setDataAte(dataAte);
            let datasPesquisa = (verificarDataMaisAntiga(dataDe,dataAte));
            let rest = '/eventos/'+ JSON.stringify(datasPesquisa);
            inserirResultado(await FetchApi.consultaGet(rest), datasPesquisa);
        }
    
        return(
            <div className='espacoDireita espacoAntes'>
                
                <div className="flexNaoResponsivo campoDestacado">
                    <p>
                        Busca por datas:
                    </p>                
                    <div>
                        <div>
                            <span>De:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <input type='date' id='dataDe' value={dataDe} onChange={manipuladorDeData} className='dataEstilizado height30px'/>               
                        </div>
                        <div className='espacoAntes'>
                            <span>Até:&nbsp;&nbsp;</span>
                            <input type='date' id='dataAte' value={dataAte} onChange={manipuladorDeData} className='dataEstilizado height30px'/>
                        </div>
                    </div>                        
                </div>
                <div className= 'espacoAntes  linkFake'>
                    <div className='flexNaoResponsivo campoDestacado justifyContentBetween '>
                        <div>
                            {FaArrowAltCircleRight}
                        </div>
                        <div className='espacoEsquerda'>
                            Próximos Eventos
                        </div>
                    </div>
                </div>                            
            </div>
        )  
    }


    async function buscar(e){
        setDataDe('');
        setDataAte('');
        let valorParaBusca = e.target.value;
        setCampoDeBusca(e.target.value);
        if(isNaN(valorParaBusca) && valorParaBusca.length < 3){
            return;
        }
        let eventoProv = await FetchApi.consultaGet('/evento/'+ valorParaBusca);
        let msgTopo = `${isNaN(valorParaBusca)? 'pesquisando pelo nome: ': 'pesquisando pelo evento: '} ${valorParaBusca}`;
        inserirResultado(eventoProv, msgTopo);        
    }

    async function manipuladorDeData(){
        setCampoDeBusca('');
        let dataDe = document.getElementById('dataDe').value;
        setDataDe(dataDe);
        let dataAte = document.getElementById('dataAte').value;
        setDataAte(dataAte);
        let datasPesquisa = (verificarDataMaisAntiga(dataDe,dataAte));
        let rest = '/eventos/'+ JSON.stringify(datasPesquisa);
        let eventoProv = await FetchApi.consultaGet(rest);
        let valorParaBusca = `pesquisando`+
            `${(dataDe && dataAte)? ' entre ' : ''}`+
            `${dataDe? transformarDataDBParaDataPortugues(dataDe): ''}`+
            `${(dataDe && dataAte)? ' e ' : ''}`+
            `${dataAte? transformarDataDBParaDataPortugues(dataAte): ''}`;
        inserirResultado(eventoProv, valorParaBusca);
    }
   
    
    return (
        <div id='opcoesEventos' className='PainelDeControle espacoAntes padding5px '>
            <InsercaoNovoEvento />
            <div className='espacoDireita flexNaoResponsivo campoDestacado espacoAntes'>
                <div className= 'tituloBuscaEvento'>           
                    <p>
                        Id ou nome do cliente
                    </p>      
                </div>
                <div>
                    <input label='id' size='15' id="campoDeBuscaEventoPorId" type='text'className='form-evento' value = {campoDeBusca} onClick={(e) => e.target.select()} onChange={(e) => {buscar(e)}}/>
                </div>          
            </div> 
            <div className='espacoDireita espacoAntes'>
                <div className="flexNaoResponsivo campoDestacado">
                    <p>
                        Busca por datas:
                    </p>                
                    <div>
                        <div>
                            <span>De:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <input type='date' id='dataDe' value={dataDe} onChange={manipuladorDeData} className='dataEstilizado height30px'/>               
                        </div>
                        <div className='espacoAntes'>
                            <span>Até:&nbsp;&nbsp;</span>
                            <input type='date' id='dataAte' value={dataAte} onChange={manipuladorDeData} className='dataEstilizado height30px'/>
                        </div>
                    </div>                        
                </div>
                <div className= 'espacoAntes  linkFake'>
                    <div className='flexNaoResponsivo campoDestacado justifyContentBetween '>
                        <div>
                            {FaArrowAltCircleRight}
                        </div>
                        <Link to={'/dashboard'} className='espacoEsquerda'>
                            Próximos Eventos
                        </Link>
                    </div>
                </div>                            
            </div>            
        </div>
    );
    
}

export default HandleEventos;