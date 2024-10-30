import {useEffect, useState, useContext, useRef} from 'react';
import {ContextoGlobal} from '../../../contexts/variaveisGlobais';

import { FetchApi } from '../../../Controller/FetchApi';
import BuscaDetalhadaClientes from '../../Clientes/BuscaDetalhadaClientes';
import TelaQuestaoDaTrocaDeEndereco from './TelaQuestaoDaTrocaDeEndereco';
import Modal from '../../Modal';

function TelaDadosCliente(props){
    const [trocarCliente, setTrocarCliente] = useState(false);
    const [perguntarTrocaDeEndereco, setPerguntarTrocaDeEndereco] = useState(false);
    const [perguntarSobreEnderecoDeClienteSemEvento, setPerguntarSobreEnderecoDeClienteSemEvento] = useState(false);
    const [ultimoEvento, setUltimoEvento] = useState({});
    const {cliente, setCliente, evento, setEvento} = useContext(ContextoGlobal);
    useEffect(() => {
    }, [controleJanelaCliente]); 

    function controleJanelaCliente(){
        
        if(props.emEdicao){
           //setClienteEditado é utilizado para que na hora de enviar o formulário com o evento editado
           //o algorítmo saiba se precisa ou não incluir o objeto cliente no evento 
           props.setClienteEditado(true);
            //setTrocarCliente dispara a abertura da janela de seleção de um novo cliente, o <BuscaDetalhadaClientes/>
            setTrocarCliente(!trocarCliente);
        }
    }

    //executa a troca do endereço do evento, faz a requizição para pegar último evento desse novo cliente
    async function trocarEnderecoDoEvento(idCliente){
        let res = await FetchApi.consultaGet(`/ultimoEvento/${idCliente}`);
        if(res.evento.length > 0){
            setUltimoEvento(res.evento[0]);
            //controle da janela que pergunta sobre a troca do endereço
            setPerguntarTrocaDeEndereco(true);
            
        }

        //props.setAtualizarEnderecoEvento(true);
    }

    //caso o cliente ainda não tenha eventos realizados, utiliza o endereço do próprio cliente para o evento
    function trocarPorEnderecoDeClienteNovo(){

    }

    //recebe o novo cliente e solicita a troca no evento
    function escolherCliente(clienteRecebido){
        setCliente(clienteRecebido);
        let eventoProv = evento;
        eventoProv.id_cliente = clienteRecebido.id_cliente;
        setEvento(eventoProv);
        controleJanelaCliente();        
        trocarEnderecoDoEvento(clienteRecebido.id_cliente); 
    }

    return(
        <div>
            <div onClick = {controleJanelaCliente} className={`clienteNoEvento ${props.emEdicao?"editarClienteNoEvento linkFake":''}`}>
                <div>
                    <h3>Cliente</h3>
                </div>
                <div>
                    {
                        <div key={cliente.nome}>
                            {cliente.nome}
                        </div>
                    }                            
                </div>
            </div>
            {trocarCliente && <BuscaDetalhadaClientes 
                controle={controleJanelaCliente} 
                escolherCliente={escolherCliente}
                />
            }
            { perguntarTrocaDeEndereco && <TelaQuestaoDaTrocaDeEndereco 
                controle = {setPerguntarTrocaDeEndereco}
                cliente = {cliente}
                ultimoEvento = {ultimoEvento}
                setEventoParaTrocaDeEndereco = {props.setEventoParaTrocaDeEndereco}
                setAtualizarEnderecoEvento = {props.setAtualizarEnderecoEvento}
                />
                 }
            {/*perguntarSobreEnderecoDeClienteSemEvento && <TelaQuestaoSobreClienteSemEvento />*/}
        </div>
    )
}

export default TelaDadosCliente;