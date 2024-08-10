import {useState, useRef, useContext, useEffect} from 'react';
import { FaCheck } from "react-icons/fa";
import Resizer from "react-image-file-resizer";

import { CustAPI } from "../../../Controller/Customizacoes";
import { FetchApi } from "../../../Controller/FetchApi";
import { ContextoGlobal } from '../../../contexts/variaveisGlobais';
import { validaCampo } from '../../../Controller/funcoesVariadas';

import * as FaIcons from "react-icons/fa";
const FaUpload = <FaIcons.FaCloudUploadAlt color='rgba(59, 59, 59, 0.8)' size={70} />




function TelaEdicaoBrinquedo(props){
    
    let setControleEdicaoBrinquedo = props?.setControleEdicaoBrinquedo;
    const [nomeImagemEdicaoBrinquedo, setNomeImagemEdicaoBrinquedo] = useState('');
    const [novaImagemBrinquedo, setNovaImagemBrinquedo] = useState(null);
    const {setBrinquedos, brinquedoSelecionado, setBrinquedoSelecionado, notify, mensagem} = useContext(ContextoGlobal);
    const [estaDisponivel, setEstaDisponivel] = useState(brinquedoSelecionado?.estaDisponivel);
    const caracteristicas = useRef(null);
    const nome_brinquedo = useRef(null);
    const observacao = useRef(null);
    const quantidade = useRef(null);
    const valor_brinquedo = useRef(null);

    useEffect(()=>{
        caracteristicas.current.value = brinquedoSelecionado? brinquedoSelecionado.caracteristicas: '';
        nome_brinquedo.current.value = brinquedoSelecionado?  brinquedoSelecionado.nome_brinquedo: '';
        observacao.current.value = brinquedoSelecionado? brinquedoSelecionado.observacao: '';
        quantidade.current.value = brinquedoSelecionado? brinquedoSelecionado.quantidade: '';
        valor_brinquedo.current.value = brinquedoSelecionado? brinquedoSelecionado.valor_brinquedo: '';
    },[]);


    function resizeImage(image){
        const width = 300; // Largura desejada da imagem redimensionada
        const height = 200; // Altura desejada da imagem redimensionada
        const type = 'file'; // Tipo de saída desejado (binário)
    
        Resizer.imageFileResizer(
            image,
            width,
            height,
            'png', // Formato de saída da imagem
            100, // Qualidade da imagem (de 0 a 100)
            0, // Rotação da imagem (em graus, 0 significa sem rotação)
            (uri) => {
                if(uri.size < 200000){
                    setNovaImagemBrinquedo(uri);
                    setNomeImagemEdicaoBrinquedo(URL.createObjectURL(uri));
                }else
                    alert("ERRO: A imagem está com " + uri.size/1000 + 'KB, porém ela deve ter menos de 200KB para ser enviada');
            },
            type
        );
    }

    function handleFile(e){
        if(e.target.files[0].type === 'image/jpeg' || e.target.files[0].type === 'image/png'){
            resizeImage(e.target.files[0]);
        }else{
            alert("A imagem tem que ter extenção .jpg ou .png");
        }
       
    }

    function handleCancelar(e){
        e.preventDefault();
        setControleEdicaoBrinquedo(false);
        setBrinquedoSelecionado(null);
        setNovaImagemBrinquedo(null);
        setBrinquedoSelecionado(null);
    }

    async function handleSubmit(e){
        e.preventDefault();
        let camposAValidar = document.getElementsByClassName('required');
        let camposInvalidos = [];

        for(let campo of camposAValidar){
            if(campo.value === ''){ //lógica de validação
                camposInvalidos.push(campo);
                validaCampo(campo);
            }
        }

        const formData = new FormData(); //gerando o formulário para envio da edição ou de inserção
        formData.append('imagem', novaImagemBrinquedo);
        formData.append('estaDisponivel', estaDisponivel);
        formData.append('caracteristicas', caracteristicas.current.value? caracteristicas.current.value: 'Não informado');
        formData.append('nome_brinquedo', nome_brinquedo.current.value);
        formData.append('observacao', observacao.current.value? observacao.current.value: 'Nenhuma');
        formData.append('quantidade', quantidade.current.value);
        formData.append('valor_brinquedo', valor_brinquedo.current.value);
        let response = null;
        if(brinquedoSelecionado){
            response = await FetchApi.edicaoPut('/brinquedo/'+brinquedoSelecionado.id_brinquedo, formData); //requisição de edição junto ao servidor
        }else{
            response = await FetchApi.edicaoPostComArquivo('/brinquedo', formData); //requisição de adição de novo brinquedo junto ao servidor
        }
        
        if(response.status){ //caso tenha editado mesmo
            if(brinquedoSelecionado){
                mensagem("Editado com Sucesso!", {theme: 'colored', type: 'success'});
            }else{
                mensagem("Inserido com Sucesso!", {theme: 'dark', type: 'success'});
            }
            
            notify();
            
            let listaBrinquedos = await FetchApi.consultaGet('/brinquedos');//atualiar array de brinquedos
            if(listaBrinquedos.brinquedo.status && listaBrinquedos.brinquedo.resultado.length > 0){
                setBrinquedos(listaBrinquedos.brinquedo.resultado);
                
                listaBrinquedos.brinquedo.resultado.map((brinquedo) => {
                    if((brinquedoSelecionado && brinquedo.id_brinquedo === brinquedoSelecionado.id_brinquedo || 
                        brinquedo.id_brinquedo === response.resultado.insertId
                    )){
                        setBrinquedoSelecionado(brinquedo); //atualizar dados do brinquedo que está selecinado
                    }
                });
            }

            
            //setControleEdicaoBrinquedo(false);
        }else{
            console.log(response);
            mensagem("Ocorreu um erro!", {theme: 'colored', type: 'error'});
            notify();
        }
    }

    function handlePausarLocacao(e){
        e.preventDefault();
        if(estaDisponivel || estaDisponivel === undefined){
            setEstaDisponivel(false);
        }else{
            setEstaDisponivel(true);
        }
    }

    return(
        <div className="espaco_em_cima">
            <hr />
            <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data" id="form_edicao_brinquedo">
                <center>
                    {brinquedoSelecionado && <button onClick={handlePausarLocacao} className="div-botao">
                        {estaDisponivel || estaDisponivel === undefined?
                            'Pausar Locação':
                            'Liberar Brinquedo'
                        }
                        
                    </button>}
                </center>
                <div>
                    <span className="letrasVermelhas campoObrigatorio">*</span>
                    <label>Nome:</label><br />
                    <div className='naoExibir letrasVermelhas'>Informe o nome do brinquedo</div>                                
                    <input type='text' className="required" 
                        onBlur={(e) => validaCampo(e.target)} ref={nome_brinquedo} id="nome_brinquedo" required/>
                    <FaCheck color="green" size="25" className="naoExibir"/>
                </div>
                <div>
                    <span className="letrasVermelhas campoObrigatorio">*</span>
                    <label>Valor para locação:</label><br />
                    <div className='naoExibir letrasVermelhas'>Informe o valor para locação</div>
                    <input type='text' className="required" 
                        onBlur={(e) => validaCampo(e.target)} ref={valor_brinquedo} id="valor_brinquedo" required/>
                    <FaCheck color="green" size="25" className="naoExibir"/>
                </div>
                <div>
                    <span className="letrasVermelhas campoObrigatorio">*</span>
                    <label>Qtd. disponível:</label><br />
                    <div className='naoExibir letrasVermelhas'>Informe a quantidade disponível</div>
                    <input type='text' className="required" 
                        onBlur={(e) => validaCampo(e.target)} ref={quantidade} id="quantidade" required/>
                    <FaCheck color="green" size="25" className="naoExibir"/>
                </div>
                <div>
                    <label>Características:</label><br />
                    <input type='text' ref={caracteristicas} id="caracteristicas" />
                </div>
                <div>
                    <label>Observações sobre o brinquedo:</label><br />
                    <input type='text' ref={observacao} id="observacao"  />
                </div>
                <center>
                    <p>Clique na imagem para escolher:</p>
                    <label className="edicaoImagemBrinquedo">                                        
                        <span>
                            {FaUpload}
                        </span>
                        <input id="imagemSelecionada" name="imagem" onChange={handleFile} accept='image/*' type='file' />
                        {nomeImagemEdicaoBrinquedo || brinquedoSelecionado?
                            <img src={nomeImagemEdicaoBrinquedo? nomeImagemEdicaoBrinquedo : CustAPI.enderecoImagemBrinquedos + brinquedoSelecionado?.foto_brinquedo} />
                            :
                        ''}
                        
                    </label>
                </center>
                <div className="flexNaoResponsivo">
                    <button className="div-botao azul">OK</button>
                    <button onClick={handleCancelar} className="div-botao vermelho">CANCELAR</button>
                </div>                
            </form>                       
        </div>
    )
}

export default TelaEdicaoBrinquedo;
