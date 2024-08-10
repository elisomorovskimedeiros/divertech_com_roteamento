import { useEffect, useRef, useState, useContext } from "react";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


import { validaCampo } from "../../../Controller/funcoesVariadas";
import Toast from "../../Toast";
import { FetchApi } from "../../../Controller/FetchApi";
import {ContextoGlobal} from '../../../contexts/variaveisGlobais';
//import {validaCampoFormulario} from "../../../Controller/funcoesVariadas";

function NovoCliente(props){
    const navigate = useNavigate();
    const {exibirToast, setExibirToast, mensagemToast, setMensagemToast, mensagem, notify} = useContext(ContextoGlobal);
    const [contemItensInvalidos, setContemItensInvalidos] = useState(false);
    const [timeOut, setTimeOut] = useState(3000);
    const [direcionarParaNovoEvento, setDirecionarParaNovoEvento] = useState(false);
    const [idCliente, setIdCliente] = useState(null);
    const nome = useRef(null);
    const cpf = useRef('');
    const data_nascimento = useRef('');
    const logradouro = useRef('');
    const numero = useRef('');
    const complemento = useRef('');
    const observacao_endereco = useRef('');
    const bairro = useRef('');
    const cidade = useRef('');
    const telefone = useRef('');
    const telefone_recado = useRef('');
    const email = useRef('');
    const observacaoCliente = useRef('');

    useEffect(() => {
        function preencherClientes(){
            if(props.cliente){
                let {cliente} = props;
                nome.current.value = cliente.nome? cliente.nome: '';
                cpf.current.value = cliente.cpf? cliente.cpf: '';
                data_nascimento.current.value = cliente.data_nascimento? cliente.data_nascimento: '';
                logradouro.current.value = cliente.logradouro? cliente.logradouro: '';
                numero.current.value = cliente.numero? cliente.numero: '';
                complemento.current.value = cliente.complemento? cliente.complemento: '';
                observacao_endereco.current.value = cliente.observacao_endereco? cliente.observacao_endereco: '';
                bairro.current.value = cliente.bairro? cliente.bairro: '';
                cidade.current.value = cliente.cidade? cliente.cidade: '';
                telefone.current.value = cliente.telefone? cliente.telefone: '';
                telefone_recado.current.value = cliente.telefone_recado? cliente.telefone_recado: '';
                email.current.value = cliente.email? cliente.email: '';
                observacaoCliente.current.value = cliente.observacaoCliente? cliente.observacaoCliente: '';
            }
            console.log(props);
        }
        preencherClientes();
    }, []);
    useEffect(() => {
        if(direcionarParaNovoEvento){
            navigate('/eventos/new', {state:{idCliente: idCliente}});
        }        
    },[direcionarParaNovoEvento]);

    function cancelar(e){
        e.preventDefault();
        props.controle(false);
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
            mensagem('Faltou preencher alguns campos', {type: 'error', theme: 'colored'});
            notify();
            //setTimeOut(3000);
            //setMensagemToast('Faltou preencher alguns campos');
            //setContemItensInvalidos(true);
            camposInvalidos[0].previousSibling.scrollIntoView();
            return false;
        }else{
            cliente = {
                nome: nome.current.value,
                cpf: cpf.current.value,
                logradouro: logradouro.current.value,
                numero: numero.current.value,
                complemento: complemento.current.value,
                observacao_endereco: observacao_endereco.current.value,
                cidade: cidade.current.value,
                telefone: telefone.current.value,
                telefone_recado: telefone_recado.current.value,
                email: email.current.value,
                observacao_cliente: observacaoCliente.current.value,
                bairro: bairro.current.value,
                data_nascimento: data_nascimento.current.value
            }
            let resp = null;
            if(props.cliente){
                resp = await FetchApi.edicaoPutSemArquivo("/cliente/"+props.cliente.id_cliente, JSON.stringify(cliente));
            }else{
                resp = await FetchApi.insercaoPost("/cliente", JSON.stringify(cliente));
            }
            console.log(resp);
            if(resp.status){
                if(resp.resultado.hasOwnProperty('insertId')){
                    cliente.id_cliente = resp.resultado.insertId;
                }
                let msg = () => {
                    return(
                        <center>
                            <h4>
                                Cliente Inserido com Sucesso
                            </h4>
                            <p>
                                Deseja inseri-lo em um evento?
                            </p>
                            <div className="divFlex">
                                <button className="espacoAntes" onClick={() => inserirEventoComOCliente(cliente.id_cliente)}>Sim</button>
                                <button className="espacoAntes" onClick={() => terminarInsersao}>Não</button>
                            </div>
                        </center>
                    )
                }
                mensagem(msg, {autoClose: 60000, closeOnClick: false});
                notify();
                    //setTimeOut(60000);
                    /*setMensagemToast(() => {
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
                    })*/
                    //setContemItensInvalidos(true);
                
            }else{
                console.log(resp);
                mensagem('Ocorreu o seguinte erro:' + resp.resultado, {type: 'error', theme: 'colored'});
                notify();
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
                                maxLength='100'
                            />   
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
                                <input type='date' id='data_nascimento' 
                                    ref={data_nascimento} 
                                    onBlur={(e) => validaCampo(e.target)}
                                    className="required"
                                    required 
                                />
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
                            <input id='observacao_endereco' ref={observacao_endereco} maxLength='100'></input>
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
                                <input id='telefone_recado' className="" ref={telefone_recado} 
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
                                <button onClick={inserirCliente} className="div-botao borda_azul linkFake espacoDireita"  >{props.cliente? 'Editar': 'Inserir'}</button>
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