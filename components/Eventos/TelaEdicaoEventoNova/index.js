import { useEffect, useState } from "react";
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
//import Reagendar_Selecionado from '../../../assets/Botoes/Reagendar_Selecionado.svg';

function TelaEdicaoEventoNova(props){
    const [atualizarEnderecoEvento, setAtualizarEnderecoEvento] = useState(false);
    //criei uma variável simples emEdicao para poder realizar as lógicas de comparação que não consigo com um state
    const [stateEmEdicao, setStateEmEdicao] = useState(false);
    let emEdicao = false;   
    let cliente = {
        nome: props.evento.nome_cliente,
        id_cliente: props.evento.id_cliente
    };
    let atualizarEndereco = false;
    let botao1 = <Botao imagem = {Editar} nome = {'Editar'} onClick = {editar}/>
    let botao2 = <Botao imagem = {Confirmar} nome = {'Confirmar'} onClick = ""/>
    let botao3 = <Botao imagem = {Reagendar} nome = {'Reagendar'} onClick = ""/>
    let botao4 = <Botao imagem = {Copiar} nome = {'Copiar'} onClick = ""/>
    let botao5 = <Botao imagem = {Cancelar} nome = {'Fechar'} onClick = {props.controle}/>
    let botao6 = <Botao imagem = {Confirmar} nome = {'OK'} onClick = ""/>
    let foiEditado = false;
    

    //conjunto de Botões para a tela mãe exibir
    useEffect(() => {
        props.setConjBotoesTopo([botao1, botao2, botao3, botao4, botao5]);
    }, []);

    useEffect(() => {
        console.log(atualizarEnderecoEvento);
    }, [atualizarEnderecoEvento]);

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
            setAtualizarEnderecoEvento = {atualizarEndereco}
            emEdicao = {stateEmEdicao}
            />
            {/* O cliente é enviado somente se for solicitada a atualização do endereço do evento */}
            <TelaDadosEvento evento = {props.evento}            
            cliente = {atualizarEnderecoEvento? cliente: null}
            emEdicao = {stateEmEdicao}
            />
            <TelaDadosBrinquedos />
        </div>
    );
}

export default TelaEdicaoEventoNova;