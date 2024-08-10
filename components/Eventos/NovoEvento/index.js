import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCheck } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";


//components
import {FetchApi}  from "../../../Controller/FetchApi";
import {retornaApenasNumeros } from "../../../Controller/funcoesVariadas";
import { mascaraDinheiro } from "../../../Controller/funcoesVariadas";
import { validaCampo } from "../../../Controller/funcoesVariadas";
import TelinhaEscolhaClientes from '../../Clientes/TelinhaEscolhaClientes';
import BuscaDetalhadaClientes from '../../Clientes/BuscaDetalhadaClientes';
import CampoSelecaoBrinquedos from '../../Brinquedos/CampoSelecaoBrinquedos';
import Toast from "../../Toast";
const {consultaGet} = FetchApi;
//import brinquedosVagos from "../../../Model/BrinquedosVagos";


function NovoEvento(){
    const [listaDeBrinquedosVagos, setListaDeBrinquedosVagos] = useState([]);    
    const [listaDeClientes, setListaDeClientes] = useState([]);
    const [buscaDetalhadaCliente, setBuscaDetalhadaCliente] = useState(false);
    const [clienteEscolhido, setClienteEscolhido] = useState({});
    const [contemItensInvalidos, setContemItensInvalidos] = useState(false);
    const [mensagemToast, setMensagemToast] = useState('');
    const navigate = useNavigate();
    const location = useLocation();


    let listaDeBrinquedosEscolhidos = [];
    let ultimoEventoDoClienteEscolhido = [];

    //referências nos campos do formulário
    const nome_cliente = useRef('');
    const data_evento = useRef('');     
    const logradouro_evento = useRef('');
    const numero_evento = useRef(''); 
    const complemento_endereco_evento = useRef('');
    const observacao_endereco_evento = useRef('');
    const bairro_evento = useRef('');
    const cidade_evento = useRef('');
    const valor_total = useRef('');
    const valor_desconto = useRef('');
    const valor_sinal = useRef('');
    const valor_final = useRef('');
    const observacao = useRef('');

    useEffect(() => {
        if(location.state){
            if(location.state.idCliente){                
                pegarUltimoEventoClienteEscolhido({id_cliente:location.state.idCliente});
            }
        }
    }, []);


   
    function handleListaDeBrinquedosEscolhidos(brinquedo){
        listaDeBrinquedosVagos.forEach((brinquedoNaLista)=>{
            if(brinquedo.id_brinquedo === brinquedoNaLista.id_brinquedo){
                brinquedoNaLista.qtdSelecionada = brinquedo.qtdSelecionada;
                listaDeBrinquedosEscolhidos.push(brinquedoNaLista);
            }
        });
        console.log(listaDeBrinquedosEscolhidos);
    }

    async function solicitarListaDeBrinquedosVagos(e){
        let dataConsulta = e.target.value;
        let brinquedosVagos = await consultaGet('/brinquedos/data/'+dataConsulta);
        setListaDeBrinquedosVagos(brinquedosVagos.brinquedo?.resultado);
    }

    //funções da pesquisa detalhada de cliente
    function abrirFormFiltrarCliente(){
        if(buscaDetalhadaCliente){
            setBuscaDetalhadaCliente(false);
        }else {
            setBuscaDetalhadaCliente(true);
            setListaDeClientes([]);
            document.getElementById("nome_cliente").value = '';
        }
    }

    function handleBotaoPesquisarCliente(e){
        e.preventDefault();
        abrirFormFiltrarCliente();
    }

    async function handleClienteEscolhidoNaPesquisaDetalhada(cliente){
        abrirFormFiltrarCliente();
        pegarUltimoEventoClienteEscolhido(cliente);
        setClienteEscolhido(cliente);
    }

    //fim das funções da pesquisa detalhada de cliente

    async function carregarListaDeClientes(e){
        let nomeConsultaCliente = e.target.value;
        console.log(e.target.value);
        let listaDeClientesProv;
        if(!nomeConsultaCliente){
            setListaDeClientes([]);
            setClienteEscolhido({});
            ultimoEventoDoClienteEscolhido = [];
            document.getElementById("logradouro_evento").value = '';
            document.getElementById("numero_evento").value = '';
            document.getElementById("complemento_endereco_evento").value = '';
            document.getElementById("observacao_endereco_evento").value = '';
            document.getElementById("bairro_evento").value = '';
            document.getElementById("cidade_evento").value = '';
            
        }else if(!isNaN(nomeConsultaCliente)){
            listaDeClientesProv = await consultaGet('/cliente/'+nomeConsultaCliente);
            console.log(listaDeClientesProv.cliente);
            if(listaDeClientesProv && 'cliente' in listaDeClientesProv && listaDeClientesProv.cliente.status){
                setListaDeClientes([...listaDeClientesProv.cliente.resultado]);
            }
        }else{
            if(nomeConsultaCliente.length < 3){
                listaDeClientesProv = [];
            }else{
                listaDeClientesProv = await consultaGet('/cliente/'+nomeConsultaCliente);
                console.log(listaDeClientesProv.cliente);
                if(listaDeClientesProv && 'cliente' in listaDeClientesProv && listaDeClientesProv.cliente.status){
                    setListaDeClientes([...listaDeClientesProv.cliente.resultado]);
                }
            }
        }       
    }

    async function handleSelecaoCliente(idCliente){
        listaDeClientes.forEach((cliente) => { 
            if(cliente.id_cliente === idCliente){
                pegarUltimoEventoClienteEscolhido(cliente);
                setClienteEscolhido(cliente);
                return;
            }
        });
        setListaDeClientes([]);
    }

    async function pegarUltimoEventoClienteEscolhido(cliente){
        console.log(cliente);
        cliente.nome && (document.getElementById("nome_cliente").value = cliente.nome);
        ultimoEventoDoClienteEscolhido = await consultaGet('/ultimoEvento/'+cliente.id_cliente);
        console.log(ultimoEventoDoClienteEscolhido);
        ultimoEventoDoClienteEscolhido.evento[0] && (ultimoEventoDoClienteEscolhido = ultimoEventoDoClienteEscolhido.evento[0]);
        ultimoEventoDoClienteEscolhido.nome? (document.getElementById("nome_cliente").value = ultimoEventoDoClienteEscolhido.nome): (document.getElementById("nome_cliente").value = ultimoEventoDoClienteEscolhido.nome_cliente);
        ultimoEventoDoClienteEscolhido.logradouro_evento? (document.getElementById("logradouro_evento").value = ultimoEventoDoClienteEscolhido.logradouro_evento): (document.getElementById("logradouro_evento").value = ultimoEventoDoClienteEscolhido.logradouro_cliente);
        ultimoEventoDoClienteEscolhido.numero_evento? (document.getElementById("numero_evento").value = ultimoEventoDoClienteEscolhido.numero_evento): (document.getElementById("numero_evento").value = ultimoEventoDoClienteEscolhido.numero_cliente);
        ultimoEventoDoClienteEscolhido.complemento_evento? (document.getElementById("complemento_endereco_evento").value = ultimoEventoDoClienteEscolhido.complemento_evento): (document.getElementById("complemento_endereco_evento").value = ultimoEventoDoClienteEscolhido.complemento_endereco_cliente);
        ultimoEventoDoClienteEscolhido.observacao_endereco_evento? (document.getElementById("observacao_endereco_evento").value = ultimoEventoDoClienteEscolhido.observacao_endereco_evento): (document.getElementById("observacao_endereco_evento").value = ultimoEventoDoClienteEscolhido.observacao_endereco_cliente);
        ultimoEventoDoClienteEscolhido.bairro_evento? (document.getElementById("bairro_evento").value = ultimoEventoDoClienteEscolhido.bairro_evento): (document.getElementById("bairro_evento").value = ultimoEventoDoClienteEscolhido.bairro_cliente);
        ultimoEventoDoClienteEscolhido.cidade_evento? (document.getElementById("cidade_evento").value = ultimoEventoDoClienteEscolhido.cidade_evento): (document.getElementById("cidade_evento").value = ultimoEventoDoClienteEscolhido.cidade_cliente);
    }

    function selecionaTodaPalavra(e){
        e.target.select();
    }

    function fechaValor(e){
        let valor = e.target.value;
        e.target.value = mascaraDinheiro(retornaApenasNumeros(valor));

        document.getElementById('valor_final').value = (

            mascaraDinheiro(Number(retornaApenasNumeros(valor_total.current.value)) - Number(retornaApenasNumeros(valor_desconto.current.value)) - Number(retornaApenasNumeros(valor_sinal.current.value)))
        )

        
    }
    
    function cancelar(e){
        e.preventDefault();
        navigate('/', {replace: true});
    }

    
    async function handleSubmit(e){
        e.preventDefault();
        let evento = {};
        
        let camposAValidar = document.getElementsByClassName('required');
        let camposInvalidos = [];
        
        for(let campo of camposAValidar){
            if(campo.value === ''){
                camposInvalidos.push(campo);
                validaCampo(campo);
            }
        }
        if(camposInvalidos.length > 0){
            setMensagemToast('Faltou preencher alguns campos');
            setContemItensInvalidos(true);
            camposInvalidos[0].previousSibling.scrollIntoView();
            return false;
        }else{
            evento = {
                cliente: clienteEscolhido,
                brinquedos: listaDeBrinquedosEscolhidos,
                evento: {
                    data: data_evento.current.value,
                    logradouro: logradouro_evento.current.value,
                    numero: numero_evento.current.value,
                    complemento: complemento_endereco_evento.current.value,
                    observacao_endereco: observacao_endereco_evento.current.value,
                    bairro: bairro_evento.current.value,
                    cidade: cidade_evento.current.value,
                    valor_total: retornaApenasNumeros(valor_total.current.value),
                    valor_desconto: retornaApenasNumeros(valor_desconto.current.value),
                    valor_sinal: retornaApenasNumeros(valor_sinal.current.value),
                    observacao_evento: observacao.current.value
                }
            }
        } 
        
        let idEventoCriado = (await FetchApi.insercaoPost('/evento', evento)).respEvento.resultado;
        if(idEventoCriado){
            navigate('/evento/'+idEventoCriado);
        }else{
            setMensagemToast('Ocorreu o seguinte erro: '+ idEventoCriado);
            setContemItensInvalidos(true);
        }
    }

   

    return(
        <div id='container-novo-evento' className="container espacoDepois">
            <div>
                <h2>Novo Evento</h2>
                <p className="letrasVermelhas">* campos obrigatórios</p>
            </div>

            <form onSubmit={(e) => handleSubmit(e)} noValidate >
                <div>
                    <fieldset className="fieldset">
                        <div className="responsiva form-flex">                                                         
                            <div>
                            <span className="letrasVermelhas campoObrigatorio">*</span><label>Nome do Cliente</label>
                            </div>
                            <div>
                                <button onClick={(e) => handleBotaoPesquisarCliente(e)} id="btn-cliente" className="linkFake btn btnVerde "><FaSearch /> <span className="fonteUmPoucoMenor">Pesquisar</span></button>
                                {buscaDetalhadaCliente? <BuscaDetalhadaClientes escolherCliente = {handleClienteEscolhidoNaPesquisaDetalhada} controle={abrirFormFiltrarCliente}/> : ''}
                            </div>
                        </div>
                        <div>
                            <div className="letrasVermelhas naoExibir">Faltou selecionar um cliente</div>
                            <input type='text' ref={nome_cliente} id="nome_cliente" name='nome_cliente' onChange={(e) => carregarListaDeClientes(e)} 
                            onClick={(e) => selecionaTodaPalavra(e)} onBlur={(e) => validaCampo(e.target)} placeholder="Cliente" className="form-control required"
                            required />
                            <FaCheck color="green" size="25" className="naoExibir"/>
                        </div>

                        {listaDeClientes.length > 0? <TelinhaEscolhaClientes listaDeClientes={listaDeClientes} handleSelecaoCliente={handleSelecaoCliente} /> : ''}
                    </fieldset>
                    
                    
                </div>
                <fieldset className="espacoAntes fieldset divFlex">
                    <div>
                        <span className="letrasVermelhas campoObrigatorio">*</span><label>Data do Evento</label>
                        <div className="letrasVermelhas naoExibir">Faltou selecionar uma data</div>             
                        <input type='date' id='data_evento' ref={data_evento} onChange={(e) => solicitarListaDeBrinquedosVagos(e)}  onBlur={(e) => validaCampo(e.target)} className="required" required />
                        <FaCheck color="green" size="25" className="naoExibir"/>
                    </div>

                    <div>
                        <span className="letrasVermelhas campoObrigatorio">*</span><label>Local do Evento</label>
                        <div className="letrasVermelhas naoExibir">Faltou informar o nome da rua, av., etc...</div>
                        <input type='text' maxLength='200' id="logradouro_evento" ref={logradouro_evento}  onBlur={(e) => validaCampo(e.target)} name='logradouro_evento' placeholder="Rua, Avenida, etc..." required className="required" />
                        <FaCheck color="green" size="25" className="naoExibir"/>
                    </div>

                    <div>
                    <span className="letrasVermelhas campoObrigatorio">*</span><label>Número do imóvel</label>
                    <div className="letrasVermelhas naoExibir">Faltou informar o número do imóvel</div>
                    <input type='text' id="numero_evento" name='numero_evento' ref={numero_evento}  onBlur={(e) => validaCampo(e.target)} placeholder="Número" className=" required"/>
                    <FaCheck color="green" size="25" className="naoExibir"/>
                    </div>

                    <div>
                        <label>Complemento</label>
                        <input type='text' maxLength='100' id="complemento_endereco_evento" ref={complemento_endereco_evento} name='complemento_endereco_cliente' placeholder="Referência, Condomínio" className="form-control"/>
                    </div>
                    <div>
                        <label>Observação do endereço</label>
                        <input type='text' maxLength='100' id="observacao_endereco_evento" ref={observacao_endereco_evento} name='observacao_endereco_cliente' placeholder="Cor da casa, etc..." className="form-control"/>
                    </div>
                    <div>
                        <span className="letrasVermelhas campoObrigatorio">*</span>
                        <label>Bairro</label>
                        <div className="letrasVermelhas naoExibir">Faltou o bairro do evento</div>
                        <input type='text' maxLength='100' id="bairro_evento" ref={bairro_evento}  onBlur={(e) => validaCampo(e.target)} name='bairro_evento' placeholder="Bairro" className="required" required />
                        <FaCheck color="green" size="25" className="naoExibir"/>
                    </div>
                    <div>
                        <span className="letrasVermelhas campoObrigatorio">*</span>
                        <label>Cidade</label>
                        <div className="letrasVermelhas naoExibir">Faltou a cidade do evento</div>
                        <input type='text' maxLength='45' id="cidade_evento" ref={cidade_evento}  onBlur={(e) => validaCampo(e.target)} name='cidade_evento' placeholder="Cidade" className="required" required />
                        <FaCheck color="green" size="25" className="naoExibir"/>
                    </div>
                </fieldset>

                <fieldset className="espacoAntes fieldset">
                    <label>Valor do evento</label>
                    <p className="letrasVermelhas campoObrigatorio">*</p>
                    <div className="letrasVermelhas naoExibir">Faltou o valor total</div>
                    <input type='text' id='valor_total' ref={valor_total}  onBlur={(e) => validaCampo(e.target)} placeholder="Valor Total" onChange={fechaValor} onClick={(e) => selecionaTodaPalavra(e)} name='valor_total' className="required" required />
                    <FaCheck color="green" size="25" className="naoExibir"/>
                    
                    <input type='text' id='valor_desconto' ref={valor_desconto} name='valor_desconto' onChange={fechaValor} onClick={(e) => selecionaTodaPalavra(e)} placeholder="Desconto" className="form-control"/>
                    <input type='text' id='valor_sinal' ref={valor_sinal} name='valor_sinal' onChange={fechaValor} onClick={(e) => selecionaTodaPalavra(e)} placeholder="Sinal" className="form-control"/>
                    <input type='text' id='valor_final' ref={valor_final} name='valor_final' onChange={fechaValor} placeholder="Valor Final" className="form-control" required disabled/>
                    
                </fieldset>
                <fieldset className="espacoAntes fieldset espacoDepois">
                    <input type='text' id='observacao' ref={observacao} name='observacao' placeholder="Observação" />
                </fieldset>

                <CampoSelecaoBrinquedos listaDeBrinquedosVagos={listaDeBrinquedosVagos} 
                                        listaDeBrinquedosEscolhidos={listaDeBrinquedosEscolhidos}/>

                <div className="espacoAntes flexNaoResponsivo">
                    <button className="btn btnBrancoAzul linkFake">Gravar Evento</button>
                    <button onClick={cancelar} className="btn btnBrancoVermelho espacoAntes linkFake">Cancelar</button>
                </div>
            </form>
            {contemItensInvalidos && <Toast mensagem = {mensagemToast} controle = {setContemItensInvalidos} timeOut={3000}/>}

        </div>
    );
}


export default NovoEvento;