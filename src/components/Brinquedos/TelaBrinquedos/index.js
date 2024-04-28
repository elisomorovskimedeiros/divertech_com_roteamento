import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";

import { CustAPI } from "../../../Controller/Customizacoes";
import { FetchApi } from "../../../Controller/FetchApi";
import Toast from '../../Toast';
import Modal from "../../Modal";

const FaPlusCircle = <FaIcons.FaPlusCircle size = {40}/>
const FaEdit = <FaIcons.FaEdit size = {40}/>
const FaWindowClose = <FaIcons.FaWindowClose size = {40} />
const FaUpload = <FaIcons.FaCloudUploadAlt color='rgb(59, 59, 59)' size={25} />

export default function TelaBrinquedos(){
    
    const [brinquedos, setBrinquedos] = useState(null);
    const [brinquedoSelecionado, setBrinquedoSelecionado] = useState(null);
    const [modalAberto, setModalAberto] = useState(false);

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

    function handlerSelecaoBrinquedos(brinquedo){
        setBrinquedoSelecionado(brinquedo);
        setModalAberto(true);             
    }

    function TelaSelecaoBrinquedos(props){
        const [controleInsercaoEmEvento, setControleInsercaoEmEvento] = useState(false);
        const [controleEdicaoBrinquedo, setControleEdicaoBrinquedo] = useState(false);
        const [nomeImagemEdicaoBrinquedo, setNomeImagemEdicaoBrinquedo] = useState('');
        const [novaImagemBrinquedo, setNovaImagemBrinquedo] = useState(null);
        const [mensagemToast, setMensagemToast] = useState('');
        const [exibirToast, setExibirToast] = useState(false);
        const [estaDisponivel, setEstaDisponivel] = useState(brinquedoSelecionado.estaDisponivel);


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

        function handleFile(e){
            if(e.target.files[0]){
                const image = e.target.files[0];
    
                if(image.type ===  'image/jpeg' || image.type === 'image/png'){
                    setNovaImagemBrinquedo(image);
                    setNomeImagemEdicaoBrinquedo(URL.createObjectURL(image));                
                }else{
                    alert("Envie uma imagem do tipo PNG ou JPEG");
                    setNovaImagemBrinquedo(null);
                    return;            
                }
            }
        }

        function handleCancelar(e){
            e.preventDefault();
            setControleEdicaoBrinquedo(false);
        }

        function handleSubmit(e){
            e.preventDefault();
            console.log(brinquedoSelecionado);

        }

        function handlePausarLocacao(e){
            e.preventDefault();
            if(estaDisponivel){
                setEstaDisponivel(false);
            }else{
                setEstaDisponivel(true);
            }
            console.log(estaDisponivel);
        }

        async function inserirBrinquedoEmEvento(){
            let numeroEvento = document.getElementById('numeroEventoParaInserirBrinquedo').value;
            let resp = await FetchApi.insercaoPost(
                '/evento/inserirBrinquedoNoEvento',
                {
                    idBrinquedo: brinquedoSelecionado.id_brinquedo, 
                    idEvento: Number(numeroEvento)
                });
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
            <Modal controle={setModalAberto}>
                <div key={brinquedoSelecionado?.id_brinquedo} onClick={() => handlerSelecaoBrinquedos(brinquedoSelecionado)} >
                    <center>
                        <div>
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
                        <div className="espaco_em_cima">
                            <hr />
                            <form onSubmit={handleSubmit}>
                                <center>
                                    <button onClick={handlePausarLocacao} className="div-botao">
                                        {estaDisponivel?
                                            'Pausar Locação':
                                            'Liberar Brinquedo'
                                        }
                                        
                                    </button>
                                </center>
                                <div>
                                    <label>Nome:</label><br />
                                    <input type='text' placeholder={brinquedoSelecionado.nome_brinquedo}/>
                                </div>
                                <div>
                                    <label>Valor para locação:</label><br />
                                    <input type='text' placeholder={brinquedoSelecionado.valor_brinquedo} />
                                </div>
                                <div>
                                    <label>Qtd. disponível:</label><br />
                                    <input type='text' placeholder={brinquedoSelecionado.quantidade} />
                                </div>
                                <div>
                                    <label>Características:</label><br />
                                    <input type='text' placeholder={brinquedoSelecionado.caracteristicas} />
                                </div>
                                <div>
                                    <label>Observações sobre o brinquedo:</label><br />
                                    <input type='text' placeholder={brinquedoSelecionado.observacao} />
                                </div>
                                <center>
                                    <p>Clique na imagem para escolher:</p>
                                    <label className="edicaoImagemBrinquedo">                                        
                                        <span>
                                            {FaUpload}
                                        </span>
                                        <input id="imagemSelecionada" onChange={handleFile} accept='image/*' type='file' />
                                        <img src={nomeImagemEdicaoBrinquedo? nomeImagemEdicaoBrinquedo : CustAPI.enderecoImagemBrinquedos + brinquedoSelecionado.foto_brinquedo} />
                                    </label>
                                </center>
                                <div className="flexNaoResponsivo">
                                    <button className="div-botao azul">OK</button>
                                    <button onClick={handleCancelar} className="div-botao vermelho">Cancelar</button>
                                </div>
                                
                            </form>
                        </div>
                        :
                        ''
                    }
                    
                    {
                        exibirToast?
                            <Toast mensagem = {mensagemToast} controle = {setExibirToast} timeOut = {'5000'} />
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
            {modalAberto? 
                <TelaSelecaoBrinquedos controle={setModalAberto}/>      
            : ''}
        </div>
       
    )
}