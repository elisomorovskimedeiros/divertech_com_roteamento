import { useEffect, useState, useContext } from "react";
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
//import Reagendar_Selecionado from '../../../assets/Botoes/Reagendar_Selecionado.svg';

function TelaEdicaoEventoNova(props){
    const [evento, setEvento] = useState(props.evento);
    const [brinquedos, setBrinquedos] = useState([]);
    const [atualizarEnderecoEvento, setAtualizarEnderecoEvento] = useState(false);
    //criei uma variável simples emEdicao para poder realizar as lógicas de comparação que não consigo com um state
    const [stateEmEdicao, setStateEmEdicao] = useState(false);
    const [eventoParaTrocaDeEndereco, setEventoParaTrocaDeEndereco] = useState({});
    const {notify, mensagem, setConteudoDaTela} = useContext(ContextoGlobal);

    const [desconto, setDesconto] = useState(undefined);
    const [sinal, setSinal] = useState(undefined);
    const [valorTotal, setValorTotal] = useState(undefined); 
    const [valorAReceber, setValorAReceber] = useState(undefined);

    let emEdicao = false;   
    let cliente = {
        nome: props.evento.nome_cliente,
        id_cliente: props.evento.id_cliente
    };
    
    
    let botao1 = <Botao imagem = {Editar} nome = {'Editar'} onClick = {editar}/>
    let botao2 = <Botao imagem = {Confirmar} nome = {'Confirmar'} onClick = ""/>
    let botao3 = <Botao imagem = {Reagendar} nome = {'Reagendar'} onClick = ""/>
    let botao4 = <Botao imagem = {Copiar} nome = {'Copiar'} onClick = ""/>
    let botao5 = <Botao imagem = {Cancelar} nome = {'Fechar'} onClick = {props.controle}/>
    let botao6 = <Botao imagem = {Confirmar} nome = {'OK'} onClick = {ok}/>
    let foiEditado = false;

 // ############## PAREI NA TROCA DE ENDEREÇO PELA ÚLTIMA FESTA DO CLIENTE NOVO
    //conjunto de Botões para a tela mãe exibir
    useEffect(() => {
        setUp();
    }, []);

    useEffect(() => {
        setValorAReceber(totalAReceber());
    }, [desconto, sinal, valorTotal]);

    function totalAReceber(){
        return mascaraDinheiro(parseInt(retornaApenasNumeros(valorTotal? valorTotal : props.evento.valor_total))
         - parseInt(retornaApenasNumeros(desconto? desconto: props.evento.valor_desconto))
         - parseInt(retornaApenasNumeros(sinal? sinal: props.evento.valor_sinal)));
    }

    function setUp(){
        props.setConjBotoesTopo([botao1, botao2, botao3, botao4, botao5]);
        setBrinquedos(props.evento.brinquedos);
        //setando valores iniciais dos inputs
        document.getElementById('data').value = transformarDataPortuguesParaDataIngles(props.evento.data_evento);
        document.getElementById('logradouro').value = props.evento.logradouro_evento;
        document.getElementById('numero').value = props.evento.numero_evento;
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
        setValorAReceber(totalAReceber());
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

    function ok(){
        //criando o array provisório para os dados do evento e capturando os valores dos inputs
        let eventoProv = {
            data: document.getElementById('data').value,
            logradouro: document.getElementById('logradouro').value,
            numero: document.getElementById('numero').value,
            bairro: document.getElementById('bairro').value,
            cidade: document.getElementById('cidade').value,
            complemento: document.getElementById('complemento').value,
            observacao: document.getElementById('observacao').value,
            observacao_evento: document.getElementById('observacao_evento').value,
            possiu_local_abrigado: document.getElementById('abrigo').value,
            valor_sinal: retornaApenasNumeros(document.getElementById('sinal').value),
            valor_desconto: retornaApenasNumeros(document.getElementById('desconto').value),
            valor_total: retornaApenasNumeros(document.getElementById('valor_total').value)
        }
        console.log(eventoProv);
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
            setAtualizarEnderecoEvento = {setAtualizarEnderecoEvento} 
            emEdicao = {stateEmEdicao}
            setEventoParaTrocaDeEndereco = {setEventoParaTrocaDeEndereco}   
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
            />
        </div>
    );
}

export default TelaEdicaoEventoNova;