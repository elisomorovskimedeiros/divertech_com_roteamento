import { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


import { validaCampo } from "../../../Controller/funcoesVariadas";
import Toast from "../../Toast";
import { FetchApi } from "../../../Controller/FetchApi";
//import {validaCampoFormulario} from "../../../Controller/funcoesVariadas";

function NovoCliente(){
    const navigate = useNavigate();
    const [contemItensInvalidos, setContemItensInvalidos] = useState(false);
    const [mensagemToast, setMensagemToast] = useState('');
    const [timeOut, setTimeOut] = useState(3000);
    const [direcionarParaNovoEvento, setDirecionarParaNovoEvento] = useState(false);
    const [idCliente, setIdCliente] = useState(null);
    const nome = useRef('');
    const cpf = useRef('');
    const dataDeNascimento = useRef('');
    const logradouro = useRef('');
    const numero = useRef('');
    const complemento = useRef('');
    const observacaoEndereco = useRef('');
    const bairro = useRef('');
    const cidade = useRef('');
    const telefone = useRef('');
    const telefoneRecado = useRef('');
    const email = useRef('');
    const observacaoCliente = useRef('');

    useEffect(() => {
        if(direcionarParaNovoEvento){
            navigate('/eventos/new', {state:{idCliente: idCliente}});
        }        
    },[direcionarParaNovoEvento]);

    function cancelar(e){
        e.preventDefault();
        navigate('/');
    }

    function inserirEventoComOCliente(idCliente){
        setIdCliente(idCliente);
        setContemItensInvalidos(false);
        setDirecionarParaNovoEvento(true);
    }

    function terminarInsersao(){
        setContemItensInvalidos(false);
        navigate('/');
    }

    async function inserirCliente(e){
        e.preventDefault();
        let camposAValidar = document.getElementsByClassName('required');
        let camposInvalidos = [];
        let cliente = {};

        for(let campo of camposAValidar){
            if(campo.value === ''){ //lógica de validação
                camposInvalidos.push(campo);
                validaCampo(campo);
            }
        }
        if(camposInvalidos.length > 0){
            setTimeOut(3000);
            setMensagemToast('Faltou preencher alguns campos');
            setContemItensInvalidos(true);
            camposInvalidos[0].previousSibling.scrollIntoView();
            return false;
        }else{
            cliente = {
                nome: nome.current.value,
                cpf: cpf.current.value,
                logradouro: logradouro.current.value,
                numero: numero.current.value,
                complemento: complemento.current.value,
                observacao_endereco: observacaoEndereco.current.value,
                cidade: cidade.current.value,
                telefone: telefone.current.value,
                telefone_recado: telefoneRecado.current.value,
                email: email.current.value,
                observacao_cliente: observacaoCliente.current.value,
                bairro: bairro.current.value,
                data_nascimento: dataDeNascimento.current.value
            }
            let resp = await FetchApi.insercaoPost("/cliente", cliente);
            if(resp.hasOwnProperty('respCliente')){
                if(resp.respCliente.resultado.hasOwnProperty('insertId')){
                    setTimeOut(60000);
                    setMensagemToast(() => {
                        return(
                            <center>
                                <h4>
                                    Cliente Inserido com Sucesso
                                </h4>
                                <p>
                                    Deseja inseri-lo em um evento?
                                </p>
                                <div className="divFlex">
                                    <button className="espacoAntes" onClick={() => inserirEventoComOCliente(resp.respCliente.resultado.insertId)}>Sim</button>
                                    <button className="espacoAntes" onClick={() => terminarInsersao}>Não</button>
                                </div>
                            </center>
                        )
                    })
                    setContemItensInvalidos(true);
                }else{
                    setMensagemToast('Ocorreu o seguinte erro:' + resp.respCliente.resultado);
                    setContemItensInvalidos(true);
                }
            }else{
                console.log(resp);
            }
        }
    }

    return(
        <div className="espaco_em_cima container containerForm">
            <fieldset className="fieldset">
                <form>
                    <div>                    
                        <div className="">
                            <p className="letrasVermelhas">* campos obrigatórios</p>
                            <span className="letrasVermelhas campoObrigatorio">*</span>
                            <label className="">Nome</label><br />
                            <div className='naoExibir letrasVermelhas'>
                                Informe nome e sobrenome
                            </div>
                            <input type='text' 
                                className="required" 
                                id='nome' 
                                required 
                                name="nome" 
                                title='Preencha nome e sobrenome'
                                ref={nome} 
                                onBlur={(e) => validaCampo(e.target)}
                                maxLength='100'>   
                            </input>
                            <FaCheck color="green" size="25" className="naoExibir"/>
                        </div>
                        <div className="espacoAntes divFlex espacoDepois">
                            <div className="">
                                <span className="letrasVermelhas campoObrigatorio">*</span>
                                <label className="">CPF ou CNPJ</label>
                                <div className='naoExibir letrasVermelhas'>
                                    Informe cpf ou cnpj do cliente, apenas números
                                </div>
                                <input id='cpf' 
                                    className="required"
                                    ref={cpf} 
                                    required
                                    onBlur={(e) => validaCampo(e.target)}
                                    maxLength='18'>                            
                                </input>
                                <FaCheck color="green" size="25" className="naoExibir"/>
                            </div>
                            <div className="">
                                <span className="letrasVermelhas campoObrigatorio">*</span>
                                <label className="">Data de Nascimento</label>
                                <div className='naoExibir letrasVermelhas'>
                                    Informe a data de nascimento do cliente
                                </div>
                                <input type='date' id='dataDeNascimento' 
                                    ref={dataDeNascimento} 
                                    onBlur={(e) => validaCampo(e.target)}
                                    className="required"s
                                    required />
                                <FaCheck color="green" size="25" className="naoExibir"/>
                            </div>
                        </div>
                        
                    </div>
                    <hr className="espaco_em_cima"/>
                    <div>
                        <div className="espacoAntes divFlex espacoDepois">
                            <div className="">
                                <span className="letrasVermelhas campoObrigatorio">*</span>
                                <label className="" >Nome da rua ou avenida</label>
                                <div className='naoExibir letrasVermelhas'>
                                    Informe o nome da rua do cliente
                                </div>
                                <input id='logradouro'  className="required" ref={logradouro} 
                                    required
                                    onBlur={(e) => validaCampo(e.target)}
                                    maxLength='200'>
                                </input>
                                <FaCheck color="green" size="25" className="naoExibir"/>
                            </div>
                            <div className="">
                                <span className="letrasVermelhas campoObrigatorio">*</span>
                                <label className="">Número da Casa</label>
                                <div className='naoExibir letrasVermelhas'>
                                    Informe o número da casa
                                </div>
                                <input id='numero' type="number" required className="required" ref={numero} 
                                    onBlur={(e) => validaCampo(e.target)}>
                                </input>
                                <FaCheck color="green" size="25" className="naoExibir"/>
                            </div>
                        </div>
                        
                        <div className="">
                            <label className="">Complemento</label><br />
                            <input id='complemento' ref={complemento} maxLength='45'>
                            </input>
                        </div>
                        <div className="divFlex">
                            <label className="">Observação sobre o endereço</label><br />
                            <input id='observacaoEndereco' ref={observacaoEndereco} maxLength='100'></input>
                        </div>
                        <div className="">
                            <span className="letrasVermelhas campoObrigatorio">*</span>
                            <label className="">Bairro</label><br />
                            <div className='naoExibir letrasVermelhas'>
                                Informe o bairro
                            </div>
                            <input id='bairro' className="required" ref={bairro} 
                                onBlur={(e) => validaCampo(e.target)}
                                maxLength='45'>
                            </input>
                            <FaCheck color="green" size="25" className="naoExibir"/>
                        </div>
                        <div className="">
                            <span className="letrasVermelhas campoObrigatorio">*</span>
                            <label className="">Cidade</label><br />
                            <div className='naoExibir letrasVermelhas'>
                                Informe a cidade
                            </div>
                            <input id='cidade' className="required" ref={cidade} 
                                onBlur={(e) => validaCampo(e.target)}
                                maxLength='100'> 
                            </input>
                            <FaCheck color="green" size="25" className="naoExibir"/>
                        </div>
                    </div>
                    <hr  className="espaco_em_cima"/>
                    <div>
                        <div className="espacoAntes divFlex espacoDepois">
                            <div className="">
                                <span className="letrasVermelhas campoObrigatorio">*</span>
                                <label className="">Telefone</label><br />
                                <div className='naoExibir letrasVermelhas'>
                                    Informe o telefone
                                </div>
                                <input id='telefone' className="required" ref={telefone}
                                    onBlur={(e) => validaCampo(e.target)}
                                    maxLength='50'> 
                                </input>
                                <FaCheck color="green" size="25" className="naoExibir"/>
                            </div>
                            <div className="">
                                <label className="">Telefone de Recado</label><br />
                                <input id='telefoneRecado' className="" ref={telefoneRecado} 
                                    maxLength='50'>
                                </input>
                            </div>
                        </div>
                        
                        <div className="dividirTelaEmDuasDivs">
                            <label className="">Email</label><br />
                            <input id='email'  className="" ref={email} maxLength='100'></input>
                        </div>
                        <div className="espaco_em_cima">
                            <label className="">Observação sobre o cliente</label><br/>
                            <textarea id='observacaoCliente'  className="" ref={observacaoCliente}  maxLength='200'></textarea>
                        </div>
                        <div className="espaco_em_cima flexNaoResponsivo">
                            <div>
                                <button onClick={inserirCliente} className="div-botao borda_azul linkFake espacoDireita"  >Inserir</button>
                            </div>
                            <div>
                                <button onClick={cancelar} className="div-botao borda_vermelha linkFake" >Cancelar</button>
                            </div>  
                        </div>
                    </div>
                </form>
            </fieldset>
            {contemItensInvalidos && <Toast mensagem = {mensagemToast} controle = {setContemItensInvalidos} timeOut={timeOut}/>}
        </div>
    )
}

export default NovoCliente;