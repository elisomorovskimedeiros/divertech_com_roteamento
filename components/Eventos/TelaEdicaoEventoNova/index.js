import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {ContextoGlobal} from '../../../contexts/variaveisGlobais';
import Botao from '../../BotoesEdicao/Botao';
import Cancelar from '../../../assets/Botoes/Cancelar.svg'
import Cancelar_Hover from '../../../assets/Botoes/Cancelar_Hover.svg';
import Cancelar_Selecionado from '../../../assets/Botoes/Cancelar_Selecionado.svg';
import Confirmar from '../../../assets/Botoes/Confirmar.svg';
import Confirmar_Hover from '../../../assets/Botoes/Confirmar_Hover.svg';
//import Confirmar_Selecionado from '../../assets/Botoes/Confirmar_Selecionado.svg';
import Copiar from '../../../assets/Botoes/Copiar.svg';
import Copiar_Hover from '../../../assets/Botoes/Copiar_Hover.svg';
//import Copiar_Selecionado from '../../../assets/Botoes/Confirmar_Selecionado.svg';
import Editar from '../../../assets/Botoes/Editar.svg';
import Editar_Hover from '../../../assets/Botoes/Editar_Hover.svg';
import Editar_Selecionado from '../../../assets/Botoes/Editar_Selecionado.svg';
import Reagendar from '../../../assets/Botoes/Reagendar.svg';
import Reagendar_Hover from '../../../assets/Botoes/Reagendar_Hover.svg';
import TelaDadosCliente from "../TelaDadosCliente";
import TelaDadosEvento from "../TelaDadosEvento";
import TelaBrinquedos from "../../Brinquedos/TelaBrinquedos";
import TelaDadosBrinquedos from "../TelaDadosBrinquedos";
import { retornaApenasNumeros, mascaraDinheiro,  transformarDataPortuguesParaDataIngles } from "../../../Controller/funcoesVariadas";
import { FetchApi, ListarEventoPorId } from "../../../Controller/FetchApi";
//import Reagendar_Selecionado from '../../../assets/Botoes/Reagendar_Selecionado.svg';

function TelaEdicaoEventoNova(props){
    const [atualizarEnderecoEvento, setAtualizarEnderecoEvento] = useState(false);
    //criei uma variável simples emEdicao para poder realizar as lógicas de comparação que não consigo com um state
    const [stateEmEdicao, setStateEmEdicao] = useState(false);
    const [eventoParaTrocaDeEndereco, setEventoParaTrocaDeEndereco] = useState({});
    const {notify, mensagem, setConteudoDaTela, evento, setEvento, cliente, setCliente, brinquedos, setBrinquedos} = useContext(ContextoGlobal);
    //setEvento(props.evento);
    const [desconto, setDesconto] = useState(undefined);
    const [sinal, setSinal] = useState(undefined);
    const [valorTotal, setValorTotal] = useState(undefined); 
    const [valorAReceber, setValorAReceber] = useState(undefined);

    const [brinquedosEditados, setBrinquedosEditados] = useState(false);
    const [clienteEditado, setClienteEditado] = useState(false);
    
    const navigate = useNavigate();

    let emEdicao = false; 
    
    let botao1 = <Botao imagem = {Editar} nome = {'Editar'} onClick = {editar}/>
    let botao2 = <Botao imagem = {Confirmar} nome = {'Confirmar'} onClick = ""/>
    let botao3 = <Botao imagem = {Reagendar} nome = {'Reagendar'} onClick = ""/>
    let botao4 = <Botao imagem = {Copiar} nome = {'Copiar'} onClick = ""/>
    let botao5 = <Botao imagem = {Cancelar} nome = {'Fechar'} onClick = {props.controle}/>
    let botao6 = <Botao imagem = {Confirmar} nome = {'OK'} onClick = {ok}/>
    let foiEditado = false;

    //conjunto de Botões para a tela mãe exibir
    useEffect(() => {
        setEvento(props.evento);
    }, []);

    useEffect(() => {
        setUp();
    }, [evento]); 

    useEffect(() => {
        
        console.log(cliente);
    }, [cliente]);

    useEffect(() => {
        setValorAReceber(totalAReceber());
    }, [desconto, sinal, valorTotal]);

    useEffect(() => {
        function atualizarEndereco(){
            if(atualizarEnderecoEvento){
                document.getElementById('logradouro').value = eventoParaTrocaDeEndereco.logradouro_evento;
                document.getElementById('numero').value = eventoParaTrocaDeEndereco.numero_evento;
                document.getElementById('bairro').value = eventoParaTrocaDeEndereco.bairro_evento;
                document.getElementById('cidade').value = eventoParaTrocaDeEndereco.cidade_evento;
                document.getElementById('complemento').value = eventoParaTrocaDeEndereco.complemento_evento;
                document.getElementById('observacao_evento').value = eventoParaTrocaDeEndereco.observacao_endereco_evento;
            }
        }   
        atualizarEndereco();
    }, [atualizarEnderecoEvento, eventoParaTrocaDeEndereco]);

    function totalAReceber(){
        return mascaraDinheiro(parseInt(retornaApenasNumeros(valorTotal? valorTotal : props.evento.valor_total))
         - parseInt(retornaApenasNumeros(desconto? desconto: props.evento.valor_desconto))
         - parseInt(retornaApenasNumeros(sinal? sinal: props.evento.valor_sinal)));
    }

    function setUp(){
        if(evento && evento.hasOwnProperty("data_evento")){
            setBrinquedos(props.evento.brinquedos);
            setCliente({
                nome: props.evento.nome_cliente,
                id_cliente: props.evento.id_cliente
            });
            props.setConjBotoesTopo([botao1, botao2, botao3, botao4, botao5]);
            document.getElementById('data').value = evento && transformarDataPortuguesParaDataIngles(evento.data_evento);
            document.getElementById('logradouro').value = evento.logradouro_evento;
            document.getElementById('numero').value = evento.numero_evento;
            document.getElementById('bairro').value = evento.bairro_evento;
            document.getElementById('cidade').value = evento.cidade_evento;
            document.getElementById('complemento').value = evento.complemento_evento;
            document.getElementById('observacao').value = evento.observacao_endereco_evento;
            document.getElementById('observacao_evento').value = evento.observacao_evento;                
            document.getElementById('abrigo').value = evento.abrigo;
            setSinal(props.evento.valor_sinal? evento.valor_sinal: 0);
            setDesconto(props.evento.valor_desconto? evento.valor_desconto: 0);
            setValorTotal(props.evento.valor_total? evento.valor_total: 0);
            setValorAReceber(mascaraDinheiro(totalAReceber()));
            setValorAReceber(totalAReceber());
        }
    }
    

    useEffect(() => {   
        //sequência iniciada quando o cliente é trocado e é selecionado o endereço do seu último evento     
        if(props.eventoParaTrocaDeEndereco && Object.keys(props.eventoParaTrocaDeEndereco).length != 0){
            let eventoProv = evento;
            eventoProv.bairro_evento = props.eventoParaTrocaDeEndereco.bairro_evento;
            eventoProv.cidade_evento = props.eventoParaTrocaDeEndereco.cidade_evento;
            eventoProv.complemento_evento = props.eventoParaTrocaDeEndereco.complemento_evento;
            eventoProv.logradouro_evento = props.eventoParaTrocaDeEndereco.logradouro_evento;
            eventoProv.numero_evento = props.eventoParaTrocaDeEndereco.numero_evento;
            eventoProv.observacao_endereco_evento = props.eventoParaTrocaDeEndereco.observacao_endereco_evento;
            document.getElementById('logradouro').value = props.eventoParaTrocaDeEndereco.logradouro_evento;
            document.getElementById('numero').value = props.eventoParaTrocaDeEndereco.numero_evento;
            document.getElementById('bairro').value = props.eventoParaTrocaDeEndereco.bairro_evento;
            document.getElementById('cidade').value = props.eventoParaTrocaDeEndereco.cidade_evento;
            document.getElementById('complemento').value = props.eventoParaTrocaDeEndereco.complemento_evento;
            document.getElementById('observacao').value = props.eventoParaTrocaDeEndereco.observacao_endereco_evento;
            setEvento(eventoProv);    
        }        
    }, [eventoParaTrocaDeEndereco]);

    async function ok(){
        //if(cliente && cliente.hasOwnProperty("id_cliente"))
        console.log(evento);
         //criando o array provisório para os dados do evento e capturando os valores dos inputs
        let eventoProv = {
            id_evento: evento.id_evento,
            id_cliente: 221,
            data: document.getElementById('data').value,
            logradouro: document.getElementById('logradouro').value,
            numero: document.getElementById('numero').value,
            bairro: document.getElementById('bairro').value,
            cidade: document.getElementById('cidade').value,
            complemento: document.getElementById('complemento').value,
            observacao: document.getElementById('observacao').value,
            observacao_evento: document.getElementById('observacao_evento').value,
            possui_local_abrigado: document.getElementById('abrigo').value,
            valor_sinal: retornaApenasNumeros(document.getElementById('sinal').value),
            valor_desconto: retornaApenasNumeros(document.getElementById('desconto').value),
            valor_total: retornaApenasNumeros(document.getElementById('valor_total').value)
        }
        if(brinquedosEditados){
            eventoProv.brinquedos = brinquedos;
            brinquedosEditados = false;
        }
        console.log(clienteEditado);
        if(clienteEditado){
            eventoProv.cliente = cliente;
            setClienteEditado = false;
        }

        let res = await FetchApi.edicaoPutSemArquivo(`evento/${eventoProv.id_evento}`, eventoProv);
        
        if(res.status){ //caso tenha editado mesmo
            mensagem("Editado com Sucesso!", {theme: 'colored', type: 'success'});
            //props.controle();
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
    
    
   function editar(){
        if(emEdicao){
            props.setConjBotoesTopo([botao1, botao2, botao3, botao4, botao5]);
        }else{
            let btnProv = <Botao imagem = {Editar_Selecionado} nome = {'Editando'} onClick = {editar}/>
            props.setConjBotoesTopo([btnProv, botao6, botao5]); 
        }
        emEdicao = !emEdicao;
        setStateEmEdicao(emEdicao);
    }

    return(
        <div>
            <TelaDadosCliente cliente = {cliente}
            setCliente = {setCliente} 
            setAtualizarEnderecoEvento = {setAtualizarEnderecoEvento} 
            emEdicao = {stateEmEdicao}
            setEventoParaTrocaDeEndereco = {setEventoParaTrocaDeEndereco}
            setClienteEditado = {setClienteEditado}  
            />
            {/* O cliente é enviado somente se for solicitada a atualização do endereço do evento */}
            <TelaDadosEvento evento = {evento}
            eventoParaTrocaDeEndereco = {eventoParaTrocaDeEndereco}
            setEvento = {setEvento}            
            cliente = {atualizarEnderecoEvento? cliente: null}
            emEdicao = {stateEmEdicao}
            desconto = {desconto}
            setDesconto = {setDesconto}
            sinal = {sinal}
            setSinal = {setSinal}
            valorTotal = {valorTotal}
            setValorTotal = {setValorTotal}
            valorAReceber = {valorAReceber}
            setValorAReceber = {setValorAReceber}
            />
            <TelaDadosBrinquedos  
            emEdicao = {stateEmEdicao}
            evento = {evento}
            brinquedos={brinquedos} 
            setBrinquedos={setBrinquedos} 
            data_evento={evento.data_evento} 
            setBrinquedosEditados = {setBrinquedosEditados}
            />
        </div>
    );
}

export default TelaEdicaoEventoNova;