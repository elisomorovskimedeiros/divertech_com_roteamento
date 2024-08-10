import { useEffect, useState, useContext } from "react";
import * as FaIcons from "react-icons/fa";
import Resizer from "react-image-file-resizer";
import { ToastContainer, toast } from 'react-toastify';

import { ContextoGlobal } from "../../../contexts/variaveisGlobais";
import { CustAPI } from "../../../Controller/Customizacoes";
import { FetchApi } from "../../../Controller/FetchApi";
import Toast from '../../Toast';
import Modal from "../../Modal";
import TelaEdicaoBrinquedo from '../TelaEdicaoBrinquedo';

const FaPlusCircle = <FaIcons.FaPlusCircle size = {40}/>
const FaEdit = <FaIcons.FaEdit size = {40}/>
const FaWindowClose = <FaIcons.FaWindowClose size = {40} />
const FaUpload = <FaIcons.FaCloudUploadAlt color='rgba(59, 59, 59, 0.8)' size={70} />

export default function TelaBrinquedos(){
    
    const {brinquedos, setBrinquedos, brinquedoSelecionado, setBrinquedoSelecionado} = useContext(ContextoGlobal);
    const [selecaoBrinquedoAberta, setSelecaoBrinquedoAberta] = useState(false);
    const [telaSelecaoBrinquedosAberta, setTelaSelecaoBrinquedosAberta] = useState(false);

    useEffect(() => {
        async function listarBrinquedos(){
            let brinquedosProv = (await FetchApi.consultaGet('/brinquedos'));
            if(brinquedosProv.brinquedo){
                brinquedosProv = (brinquedosProv.brinquedo.resultado);
                setBrinquedos(brinquedosProv);
            }else{
                console.log(brinquedosProv);
            }
            
        }
        listarBrinquedos();
        
    }, []);

    //useEffect(() => {console.log("Atualizou")}, [brinquedoSelecionado]);

    function handlerModal(aberto){
        setSelecaoBrinquedoAberta(aberto);
        if(!aberto){
            setBrinquedoSelecionado(null);
        }
    }

    function handlerSelecaoBrinquedos(brinquedo){
        setBrinquedoSelecionado(brinquedo);
        setSelecaoBrinquedoAberta(true);             
    }

    function handlerTelaAdionarBrinquedos(){
        setTelaSelecaoBrinquedosAberta(true);
    }

    function TelaAdicionarBrinquedos(props){
        return(
            <Modal controle={props.controle}>
                <TelaEdicaoBrinquedo setControleEdicaoBrinquedo={props.controle}/>
            </Modal>
        )
    }

    function TelaSelecaoBrinquedos(){
        const [controleInsercaoEmEvento, setControleInsercaoEmEvento] = useState(false);
        const [controleEdicaoBrinquedo, setControleEdicaoBrinquedo] = useState(false);
        const {exibirToast, setExibirToast, mensagemToast, setMensagemToast, notify} = useContext(ContextoGlobal);
        
        function handlerTelaInserirEmEvento(){
            setControleEdicaoBrinquedo(false);
            if(controleInsercaoEmEvento){
                setControleInsercaoEmEvento(false);
            }else{
                setControleInsercaoEmEvento(true);
            }
        }

        function handlerTelaEditarBrinquedo(){
            setControleInsercaoEmEvento(false);
            if(controleEdicaoBrinquedo){
                setControleEdicaoBrinquedo(false);
            }else{
                setControleEdicaoBrinquedo(true);
            }
        }

        async function inserirBrinquedoEmEvento(){
            let numeroEvento = document.getElementById('numeroEventoParaInserirBrinquedo').value;
            numeroEvento = Number(numeroEvento);
            let dados  =  JSON.stringify(
                {
                    idBrinquedo: brinquedoSelecionado.id_brinquedo, 
                    idEvento: numeroEvento
                });
            let formData = new FormData();
            formData.append('idBrinquedo', brinquedoSelecionado.id_brinquedo);
            formData.append('idEvento', numeroEvento);
            let resp = await FetchApi.insercaoPost('/evento/inserirBrinquedoNoEvento', dados);
            console.log(resp);
            if(resp.status){
                let brinquedosNoEvento = await FetchApi.consultaGet('/evento/'+numeroEvento+'/brinquedos');
                console.log(brinquedosNoEvento);
                if(brinquedosNoEvento.status){
                    setMensagemToast(() => {
                        return(
                            <fieldset className="fieldset" >
                                <h4>Brinquedo inserido com sucesso!</h4>
                                <h5>Lista de brinquedos atualmente no evento:</h5>
                                {brinquedosNoEvento.resultado.map((brinquedo, indice) => {
                                    return <img key={indice} className="espacoDireita icone_brinquedo_bem_pequeno" src={CustAPI.enderecoImagemBrinquedos+brinquedo.foto_brinquedo} />
                                })}
                            </fieldset>
                        )}
                    );
                    setExibirToast(true);  
                }else if(resp.hasOwnProperty('erro')){
                    setMensagemToast(resp.erro);
                    setExibirToast(true); 
                }else{
                    setMensagemToast("Ocorreu um erro na conexão com o servidor");
                    setExibirToast(true); 
                }
            }else if(resp.hasOwnProperty('erro')){
                setMensagemToast(resp.erro);
                setExibirToast(true); 
            }else{
                setMensagemToast("Ocorreu um erro na conexão com o servidor");
                setExibirToast(true); 
            }
        }

        return(
            <Modal controle={handlerModal}>
                <div key={brinquedoSelecionado?.id_brinquedo} onClick={() => handlerSelecaoBrinquedos(brinquedoSelecionado)} >
                    <center>
                        <div onClick={notify} >
                            <img alt={brinquedoSelecionado?.nome_brinquedo} className="icone_brinquedos" src={CustAPI.enderecoImagemBrinquedos + brinquedoSelecionado?.foto_brinquedo} />                                
                        </div>
                        <div>
                            <h4 className="maiusculas">{brinquedoSelecionado?.nome_brinquedo}</h4>
                            <h5>Quantidade disponível: {brinquedoSelecionado?.quantidade}</h5>
                        </div>
                    </center>
                    <div className="flexNaoResponsivo">
                        <button onClick={() => handlerTelaInserirEmEvento()} className="linkFake div-botao">
                            <div>
                                {FaPlusCircle}
                            </div>
                            <div>
                                Inserir em Evento
                            </div>                    
                        </button>

                        <button onClick={() => handlerTelaEditarBrinquedo()} className="linkFake div-botao">
                            <div>
                                {FaEdit}
                            </div>
                            <div>
                                Editar Brinquedo
                            </div>                    
                        </button>
                    </div>
                    {
                        controleInsercaoEmEvento? 
                            <div className="espaco_em_cima">
                                <hr />
                                <label>Informe o evento:</label>
                                <input type='number' id="numeroEventoParaInserirBrinquedo" className="inputNumero"/>
                                <button onClick={() => inserirBrinquedoEmEvento()} className="espacoEsquerda">OK</button>
                            </div>
                        :
                        ''
                    }
                    {
                        controleEdicaoBrinquedo?
                            <TelaEdicaoBrinquedo setControleEdicaoBrinquedo={setControleEdicaoBrinquedo} />
                        :
                        ''
                    }                   
                    
                </div>
            </Modal>
        )
    }

    return(
        <div className="containerForm">
             <div className="divFlex">
                <div>
                    <button onClick={handlerTelaAdionarBrinquedos} className="espacoAntes fieldset linkFake espacoDepois">{FaPlusCircle}</button>
                </div>
                {brinquedos? brinquedos.map((brinquedo) => {
                    return (
                        <fieldset key={brinquedo.id_brinquedo} onClick={() => handlerSelecaoBrinquedos(brinquedo)} className="espacoAntes fieldset linkFake espacoDepois">
                            <center>
                                <div>
                                    <img alt={brinquedo.nome_brinquedo} className="icone_brinquedos" src={CustAPI.enderecoImagemBrinquedos + brinquedo.foto_brinquedo} />                                
                                </div>
                                <div>
                                    <h4 className="maiusculas">{brinquedo.nome_brinquedo}</h4>
                                    <h5>Quantidade disponível: {brinquedo.quantidade}</h5>
                                </div>
                            </center>
                        </fieldset>
                    )})
                :
                    <div>Sem Conexão com o Servidor</div>
                }
                
            </div>
            {selecaoBrinquedoAberta? 
                <TelaSelecaoBrinquedos controle={setSelecaoBrinquedoAberta}/>      
            : ''}
            {telaSelecaoBrinquedosAberta? 
                <TelaAdicionarBrinquedos controle={setTelaSelecaoBrinquedosAberta}/>      
            : ''}
        </div>
       
    )
}