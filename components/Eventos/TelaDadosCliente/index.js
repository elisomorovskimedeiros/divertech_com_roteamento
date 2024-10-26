import {useEffect, useState, useContext, useRef} from 'react';
import {ContextoGlobal} from '../../../contexts/variaveisGlobais';

import { FetchApi } from '../../../Controller/FetchApi';
import BuscaDetalhadaClientes from '../../Clientes/BuscaDetalhadaClientes';
import TelaQuestaoDaTrocaDeEndereco from './TelaQuestaoDaTrocaDeEndereco';
import Modal from '../../Modal';

function TelaDadosCliente(props){
    const [cliente, setCliente] = useState(props.cliente);
    const [trocarCliente, setTrocarCliente] = useState(false);
    const [perguntarTrocaDeEndereco, setPerguntarTrocaDeEndereco] = useState(false);
    const [perguntarSobreEnderecoDeClienteSemEvento, setPerguntarSobreEnderecoDeClienteSemEvento] = useState(false);
    const [ultimoEvento, setUltimoEvento] = useState({});
    useEffect(() => {
    }, [controleJanelaCliente]); 

    function controleJanelaCliente(){
        if(props.emEdicao){
            setTrocarCliente(!trocarCliente);
        }
    }

    //executa a troca do endereço do evento, faz a requizição para pegar último evento desse novo cliente
    async function trocarEnderecoDoEvento(idCliente){
        let res = await FetchApi.consultaGet(`/ultimoEvento/${idCliente}`);
        
        if(res.evento.length > 0){

            if(res.evento[0].logradouro_evento){                
                setPerguntarTrocaDeEndereco(true)
            }else{
                setPerguntarSobreEnderecoDeClienteSemEvento(true)
            }
            
            props.setEventoParaTrocaDeEndereco(res.evento[0]);
        }
        props.setAtualizarEnderecoEvento(true);
    }

    //caso o cliente ainda não tenha eventos realizados, utiliza o endereço do próprio cliente para o evento
    function trocarPorEnderecoDeClienteNovo(){

    }

    //recebe o novo cliente e solicita a troca no evento
    function escolherCliente(clienteRecebido){
        if(cliente.id_cliente !== clienteRecebido.id_cliente){
            controleJanelaCliente();
            setCliente(clienteRecebido);
            trocarEnderecoDoEvento(clienteRecebido.id_cliente);                       
        }
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
                    escolherCliente={escolherCliente}/>
            }
            {perguntarTrocaDeEndereco && <Modal titulo = {"Deseja trocar o endereço do evento?"} controle = {setPerguntarTrocaDeEndereco}>
                                            <TelaQuestaoDaTrocaDeEndereco/>
                                        </Modal>}
            {/*perguntarSobreEnderecoDeClienteSemEvento && <TelaQuestaoSobreClienteSemEvento />*/}
        </div>
    )
}

export default TelaDadosCliente;