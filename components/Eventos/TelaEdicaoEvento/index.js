import {useEffect, useState, useContext, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import {ContextoGlobal} from '../../../contexts/variaveisGlobais';
import Modal from '../../Modal';
import BuscaDetalhadaClientes from "../../Clientes/BuscaDetalhadaClientes";
import Cancelar_Hover from '../../../assets/Botoes/Cancelar_Hover.svg';
import Cancelar from '../../../assets/Botoes/Cancelar.svg';
import Cancelar_Selecionado from '../../../assets/Botoes/Cancelar_Selecionado.svg';
import Confirmar from '../../../assets/Botoes/Confirmar.svg';
import Confirmar_Hover from '../../../assets/Botoes/Confirmar_Hover.svg';
import Confirmar_Selecionado from '../../../assets/Botoes/Confirmar_Selecionado.svg';
import Copiar from '../../../assets/Botoes/Copiar.svg';
import Copiar_Hover from '../../../assets/Botoes/Copiar_Hover.svg';
import Copiar_Selecionado from '../../../assets/Botoes/Copiar_Selecionado.svg';
import Editar from '../../../assets/Botoes/Editar.svg';
import Editar_Hover from '../../../assets/Botoes/Editar_Hover.svg';
import Editar_Selecionado from '../../../assets/Botoes/Editar_Selecionado.svg';
import Reagendar from '../../../assets/Botoes/Reagendar.svg';
import Reagendar_Hover from '../../../assets/Botoes/Reagendar_Hover.svg';
import Reagendar_Selecionado from '../../../assets/Botoes/Reagendar_Selecionado.svg';
import ListaDeBrinquedosNoEvento from '../../Brinquedos/ListaDeBrinquedosNoEvento';
import { mascaraDinheiro, transformarDataPortuguesParaDataIngles, retornaApenasNumeros } from '../../../Controller/funcoesVariadas';
import TelaDeTrocaDeBrinquedosNoEvento from '../../Brinquedos/TelaDeTrocaDeBrinquedosNoEvento';
import {ListarEventoPorId, FetchApi } from '../../../Controller/FetchApi';
let foiEditado = false;
let clienteEditado = false;
let brinquedosEditados = false;
function TelaEdicaoEvento(props){
    let evento = props.evento;
    const navigate = useNavigate();
    let brinquedosProv = {};
    const [emEdicao, setEmEdicao] = useState(false);
    const [trocarCliente, setTrocarCliente] = useState(false);
    const [trocarBrinquedos, setTrocarBrinquedos] = useState(false);
    const [atualizarEnderecoEvento, setAtualizarEnderecoEvento] = useState(false);
    const [cliente, setCliente] = useState({});
    const [brinquedos, setBrinquedos] = useState([]);
    const [ultimoEvento, setUltimoEvento] = useState({});
    const [chavesOrdenadas, setChavesOrdenadas] = useState([]);
    //objetos contendo os botoes, seus nomes e funções associadas
    const [botao1, setBotao1] = useState({botao: Editar, nome: 'Editar'});
    const [botao2, setBotao2] = useState({botao: Confirmar, nome: "Confirmar"});
    const [botao3, setBotao3] = useState({botao: Reagendar, nome: "Reagendar"});
    const [botao4, setBotao4] = useState({botao: Copiar, nome: "Copiar"});
    const [botao5, setBotao5] = useState({botao: Cancelar, nome: "Cancelar"});
    const [botao6, setBotao6] = useState({botao: Confirmar, nome: "OK"});
    const [statusEvento, setStatusEvento] = useState(null);
    const [desconto, setDesconto] = useState(0);
    const [sinal, setSinal] = useState(0);
    const [valorTotal, setValorTotal] = useState(0);
    const [valorAReceber, setValorAReceber] = useState(0);
    const {notify, mensagem, setConteudoDaTela} = useContext(ContextoGlobal);
    
    

    //refs do formulário
    
    const logradouro = useRef(null), data = useRef(null), numero = useRef(null), bairro = useRef(null),
        cidade = useRef(null), complemento = useRef(null), observacao = useRef(null), observacao_evento = useRef(null),
        possui_local_abrigado = useRef(null), status = useRef(null);
        
    //array de botoes que irá variar dependendo do tipo de entidade recebida
    const [conjBotoes, setConjBotoes] = useState([]);
    let c = [
        botao1, botao2, botao3, botao4, botao5
    ];

    useEffect(() => {
        //detecção do tipo de entidade recebida para foco na tela (evento, cliente ou brinquedo)

        function btnSelect(){
            
            if(props.hasOwnProperty("evento")){
                setConjBotoes([
                    botao1, botao2, botao3, botao4, botao5
                ]);
                // Obter todas as chaves do objeto evento
                const chaves = Object.keys(props.evento);
                // Ordenar as chaves por ordem alfabética
                chaves.sort((a, b) => a.localeCompare(b));
                const clienteObj = {};
                let brinquedosObj = [];
                // Separar as chaves que contêm 'cliente', 'brinquedos' em objetos separados e colocando semântica na chave
                chaves.forEach(chave => {
                    if (chave.includes('cliente')) {
                        clienteObj[chave] = props.evento[chave];
                    }
                    if (chave.includes('brinquedos')) {
                        brinquedosObj = props.evento[chave];
                    }
                });
                setCliente(clienteObj);
                setBrinquedos(brinquedosObj);
                // Colocar 'id_evento' e 'logradouro' no início da lista
                setChavesOrdenadas(['id_evento', 'logradouro', ...chaves.filter(chave => chave !== 'id_evento' && chave !== 'logradouro')]);
                props.evento.data_evento = transformarDataPortuguesParaDataIngles(props.evento.data_evento);
                
                //setando valores iniciais dos inputs
                document.getElementById('data').value = props.evento?.data_evento;
                document.getElementById('logradouro').value = props.evento?.logradouro_evento;
                document.getElementById('numero').value = props.evento?.numero_evento;
                document.getElementById('bairro').value = props.evento.bairro_evento;
                document.getElementById('cidade').value = props.evento.cidade_evento;
                document.getElementById('complemento').value = props.evento.complemento_evento;
                document.getElementById('observacao').value = props.evento.observacao_endereco_evento;
                document.getElementById('observacao_evento').value = props.evento.observacao_evento;                
                document.getElementById('abrigo').value = props.evento.abrigo;
                setSinal(props.evento.valor_sinal? props.evento.valor_sinal: 0);
                setDesconto(props.evento.valor_desconto? props.evento.valor_desconto: 0);
                setValorTotal(props.evento.valor_total? props.evento.valor_total: 0);
                setValorAReceber(mascaraDinheiro(totalAReceber()));
            }
        }
        btnSelect();
    },[]);

    useEffect(() => {
        console.log(sinal);
        setValorAReceber(mascaraDinheiro(totalAReceber()));
        
    }, [sinal, desconto, valorTotal])

    function funcao(e){
        switch(e.target.alt){
            case 'Editar': editar();
            break;
            case 'Editando': editar();
            break;
            case 'Cancelar': cancelar();
            break;
            case 'Confirmar': confirmar();
            break;
            case 'OK': ok();
            break;
            default: console.log(e.target.alt);
        }
    }

    

    function editar(){
        let btnProv = botao1;
        let inputs = document.getElementsByTagName('input');
        foiEditado = true;
        if(emEdicao){
            btnProv.nome = "Editar";
            btnProv.botao = Editar;
            setConjBotoes([botao1, botao2, botao3, botao4, botao5]);
            //para iterar o HTMLCollection inputs eu poderia também usar:
            //Array.from(inputs).forEach(input => {input.disabled = false});
            for(let input of inputs){
                input.disabled = true;
            }
        }else{
            btnProv.nome = "Editando";
            btnProv.botao = Editar_Selecionado;
            setConjBotoes([botao1, botao6, botao5]);
            for(let input of inputs){
                input.disabled = false;
            }
        }
        setBotao1(btnProv);
        setEmEdicao(!emEdicao);
    }

    async function confirmar(){
        let eventoProv = evento;
        if(eventoProv.status !== 1){
            eventoProv.status = 1;
        }
        let res = await FetchApi.edicaoPutSemArquivo(`evento/${eventoProv.id_evento}`, eventoProv);
            
            if(res.status){ //caso tenha editado mesmo
                mensagem("Editado com Sucesso!", {theme: 'colored', type: 'success'});
                fechar();
            }else{
                mensagem("Ocorreu um erro ao editar", {theme: 'dark', type: 'error'});
                console.log(res);
            }
            //faz aparecer a mensagem setada a pouco            
            notify();
            //faz aparecer a url com o id correto
            navigate('/eventos/'+eventoProv.id_evento);
            //refaz a busca pelo evento recém editado
            ListarEventoPorId (eventoProv.id_evento, setConteudoDaTela);  

    }

    async function ok(){        
        if(!foiEditado){
            fechar();
        }else{
            let eventoProv = {
                possui_local_abrigado: possui_local_abrigado.current?.value, 
                bairro : bairro.current?.value,
                cidade: cidade.current?.value,
                data: data.current?.value,
                id_evento: props.evento.id_evento,
                logradouro: logradouro.current?.value,
                numero: numero.current?.value,
                observacao: observacao.current?.value,
                observacao_evento: observacao_evento.current?.value,
                valor_desconto: retornaApenasNumeros(desconto),
                valor_sinal: retornaApenasNumeros(sinal),
                valor_total: retornaApenasNumeros(valorTotal)
            };
            if(brinquedosEditados){
                eventoProv.brinquedos = brinquedos;
                brinquedosEditados = false;
            }
            if(clienteEditado){
                eventoProv.cliente = cliente;
                clienteEditado = false;
            }

            let res = await FetchApi.edicaoPutSemArquivo(`evento/${eventoProv.id_evento}`, eventoProv);
            
            if(res.status){ //caso tenha editado mesmo
                mensagem("Editado com Sucesso!", {theme: 'colored', type: 'success'});
                fechar();
            }else{
                mensagem("Ocorreu um erro ao editar", {theme: 'dark', type: 'error'});
                console.log(res);
            }
            //faz aparecer a mensagem setada a pouco            
            notify();
            //faz aparecer a url com o id correto
            navigate('/eventos/'+eventoProv.id_evento);
            //refaz a busca pelo evento recém editado
            ListarEventoPorId (eventoProv.id_evento, setConteudoDaTela);          
        }
    }

    function reagendar(){
        
    }

    function copiar(){
        
    }

    function cancelar(){
        fechar();
    }
    
    //envia false para o controle recebido do component pai
    function fechar(){
        foiEditado = false;
        props.controle(false);
    }

    async function escolherCliente(clienteRecebido){
        if(cliente.id_cliente !== clienteRecebido.id_cliente){
            clienteEditado = true;
            controleJanelaCliente();
            setCliente(clienteRecebido);            
            let res = await FetchApi.consultaGet(`/ultimoEvento/${clienteRecebido.id_cliente}`);
            
            if(res.evento.length > 0){
                setUltimoEvento(res.evento[0]);
            }
            setAtualizarEnderecoEvento(true);
        }
    }

    function DesejaAtualizarEnderecoDoEvento(){
        function naoAtualizar(){
            setAtualizarEnderecoEvento(false);
        }
        function atualizarComEnderecoDoCliente(){
            setAtualizarEnderecoEvento(false);
            document.getElementById('logradouro').value = cliente?.logradouro;
            document.getElementById('numero').value = cliente.numero;
            document.getElementById('bairro').value = cliente.bairro;
            document.getElementById('cidade').value = cliente.cidade;
            document.getElementById('complemento').value = cliente.complemento;
            document.getElementById('observacao').value = cliente.observacao_endereco;
            
        }
        function atualizarComUltimoEvento(){
            setAtualizarEnderecoEvento(false);
            document.getElementById('logradouro').value = ultimoEvento?.logradouro_evento;
            document.getElementById('numero').value = ultimoEvento?.numero_evento;
            document.getElementById('bairro').value = ultimoEvento.bairro_evento;
            document.getElementById('cidade').value = ultimoEvento.cidade_evento;
            document.getElementById('complemento').value = ultimoEvento.complemento_evento;
            document.getElementById('observacao').value = ultimoEvento.observacao_endereco_evento;
        }
        return(
            <Modal titulo={"Deseja atualizar o endereço do evento?"} controle={setAtualizarEnderecoEvento}>

                <div onClick={naoAtualizar} className='bordaBonita borda_vermelha espacoDepois troca_de_endereco'>
                    <h2>Não atualizar</h2>
                </div>
                <hr />
                <div>
                    <h2>Sim, desejo atualizar por</h2>
                    <div onClick={atualizarComEnderecoDoCliente} className='bordaBonita borda_verde troca_de_endereco'>
                        <h3>Residência do Cliente:</h3>
                        <p>{cliente.logradouro}, {cliente.numero}, {cliente.bairro},{cliente.cidade}</p>
                    </div>
                    {
                        ultimoEvento.logradouro_evento &&
                        <div onClick={atualizarComUltimoEvento} className='bordaBonita borda_azul troca_de_endereco'>
                            <h3>Endereço do último evento do cliente:</h3>
                            {<p>{ultimoEvento.logradouro_evento}, {ultimoEvento.numero_evento}, {ultimoEvento.bairro_evento}, {ultimoEvento.cidade_evento}</p>}
                        </div>
                    }
                    
                </div>
            </Modal>
        );        
    }

    function controleJanelaCliente(){
        if(emEdicao){
            setTrocarCliente(!trocarCliente);
        }
    }



    function semanticaChave(chave){
        chave = (chave.charAt(0).toUpperCase()+chave.slice(1));
        while(chave.includes('_')) {
            chave = chave.replace('_', ' do ');
        }
        return chave;
    }

    function totalAReceber(){
        return parseInt(retornaApenasNumeros(valorTotal)) - parseInt(retornaApenasNumeros(desconto)) - parseInt(retornaApenasNumeros(sinal));
    }

    function escolherBrinquedos(){
        if(emEdicao){
            brinquedosEditados = true;
            setTrocarBrinquedos(!trocarBrinquedos);
        }
    }

    function verificarStatus(){
        let msg, estilo;
        switch(evento.status){
            case(0): msg = "Evento Ainda Não Confirmado";
                     estilo = "fundoAzulFraco";
            break;
            case(1): msg = "Evento Confirmado";
                     estilo = "btnVerde";
            break;
            case(2): msg = "Evento Cancelado";
                     estilo = "fundoLaranjaFraco";
            break;
            default: msg = "Status Inválido";
                     estilo = "fundoVermelhoFraco";
            break;            
        }
        return(
            <span className={`bordaBonita ${estilo} padding5px espacoEsquerda`}>
                {msg}
            </span>
        )
    }


    return(
        <div id="telaEdicaoEntidades">
            <center className="campoTopo flex flexNaoResponsivo linkFake">
                {conjBotoes.map((botao) => {
                    return(
                        <div onClick={funcao} key={botao.nome} className='opcaoTelaEdicao'>
                            <div className='imagemOpcao'>
                                <img src={botao.botao} alt={botao.nome} width={70}/>
                            </div>
                            <div className='nomeOpcao'>
                                {botao.nome}
                            </div>
                        </div>
                    )
                })}
                
            </center>
            <hr />
            <div id="campoForumulario">
                <form>
                    <div onClick={controleJanelaCliente} className={`clienteNoEvento ${emEdicao?"editarClienteNoEvento linkFake":''}`}>
                        <div>
                            <h3>Cliente</h3>
                        </div>
                        <div>
                            {/* Renderizar objeto cliente separado */}
                            {
                                <div key={cliente.nome_cliente || cliente.nome}>
                                    {cliente.nome_cliente || cliente.nome}
                                </div>
                            }                            
                        </div>
                    </div>
                    {trocarCliente && <BuscaDetalhadaClientes controle={controleJanelaCliente} 
                                                            escolherCliente={escolherCliente}/>}
                    {atualizarEnderecoEvento && <DesejaAtualizarEnderecoDoEvento/>}
                    <hr />
                    {/* Renderizar dados do evento */}
                    <div className='divFlex'>
                        <div className='col3Responsivo'>
                            <div>
                                <span>
                                    Id do Evento:{evento.id_evento}
                                </span>                            
                                {verificarStatus()}          
                            </div>
                            <div>
                                <label htmlFor='data'>Data</label>
                            </div>
                            <div>
                                <input type="date" id='data' name='data'
                                        
                                        ref = {data}
                                        disabled
                                />     
                            </div>
                            <div>
                                <label htmlFor='logradouro'>Endereço</label>
                            </div>
                            <div>
                                <input type="text" id='logradouro' name='logradouro'
                                        ref = {logradouro}
                                        disabled
                                />
                                <input type="text" id='numero' name='numero'
                                        
                                        ref = {numero}
                                        disabled
                                />                             
                            </div>
                            <div>
                                <label htmlFor='bairro'>Bairro do evento</label>
                            </div>
                            <div>
                                <input type="text" id='bairro' name='bairro'
                                        ref = {bairro}
                                        disabled
                                />     
                            </div>
                            <div>
                                <label htmlFor='cidade'>Cidade do evento</label>
                            </div>
                            <div>
                                <input type="text" id='cidade' name='cidade'
                                        ref = {cidade}
                                        disabled
                                />     
                            </div>
                            <div>
                                <label htmlFor='complemento'>Complemento do endereço</label>
                            </div>
                            <div>
                                <input type="text" id='complemento' name='complemento'
                                        ref = {complemento}
                                        disabled
                                />     
                            </div>
                            <div>
                                <label htmlFor='observacao'>Observação do endereço</label>
                            </div>
                            <div>
                                <input type="text" id='observacao' name='observacao'
                                        ref = {observacao}
                                        disabled
                                />     
                            </div>
                            <div>
                                <label htmlFor='observacao_evento'>Observação sobre o evento</label>
                            </div>
                            <div>
                                <input type="text" id='observacao_evento' name='observacao_evento'
                                        ref = {observacao_evento}
                                        disabled
                                />     
                            </div>
                            <div>
                                <label htmlFor='abrigo'>Possui local abrigado?</label>
                            </div>
                            <div>
                                <input type="text" id='abrigo' name='abrigo'
                                        ref = {possui_local_abrigado}
                                        disabled
                                />     
                            </div>
                            
                            <div>
                                <label htmlFor='valor_total'>Valor Total do Evento</label>
                            </div>
                            <div>
                                <input type="text" id='valor_total' name='valor_total'
                                        value = {mascaraDinheiro(valorTotal)}
                                        onChange = {(e) => setValorTotal(e.target.value)}
                                        disabled
                                />
                            </div>
                            <div>
                                <label htmlFor='sinal'>Valor do Sinal</label>
                            </div>
                            <div>
                                <input type="text" id='sinal' name='sinal'
                                        value = {mascaraDinheiro(sinal)}
                                        onChange = {(e) => setSinal(e.target.value)}
                                        disabled
                                />
                            </div>
                            <div>
                                <label htmlFor='desconto'>Valor do Desconto</label>
                            </div>
                            <div>
                                <input type="text" id='desconto' name='desconto'
                                        value = {mascaraDinheiro(desconto)}
                                        onChange = {(e) => setDesconto(e.target.value)}
                                        disabled
                                />
                            </div>
                            <div>
                                <label htmlFor='valor_a_receber'>Valor a Receber no Ato</label>
                            </div>
                            <div>
                                {valorAReceber}
                            </div>
                        </div>
                    </div>
                    <div onClick={escolherBrinquedos} className={`listaDeBrinquedosNoEvento espacoADireita ${emEdicao?"editarClienteNoEvento linkFake listaDeBrinquedosNoEventoEmEdicao":''}`}>
                        {brinquedos && <ListaDeBrinquedosNoEvento brinquedos={brinquedos} />}
                    </div>
                    {trocarBrinquedos?
                        <Modal controle={escolherBrinquedos} classes={'containerTrocaDeBrinquedos'} titulo={"Trocar Brinquedos"}>
                            <TelaDeTrocaDeBrinquedosNoEvento brinquedos={brinquedos} setBrinquedos={setBrinquedos} data_evento={evento.data_evento} controle={escolherBrinquedos}/>
                        </Modal>
                        : 
                    ''}                    
                </form>
            </div>
        </div>
    )
}

export default TelaEdicaoEvento;