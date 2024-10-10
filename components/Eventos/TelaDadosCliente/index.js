import {useEffect, useState, useContext, useRef} from 'react';
import {ContextoGlobal} from '../../../contexts/variaveisGlobais';

import { FetchApi } from '../../../Controller/FetchApi';
import BuscaDetalhadaClientes from '../../Clientes/BuscaDetalhadaClientes';

function TelaDadosCliente(props){
    const [cliente, setCliente] = useState(props.cliente);
    const [trocarCliente, setTrocarCliente] = useState(false);
    const [ultimoEvento, setUltimoEvento] = useState({});
    console.log(props);
    useEffect(() => {
        console.log(props.setAtualizarEnderecoEvento);
    }, [controleJanelaCliente]); 

    function controleJanelaCliente(){
        if(props.emEdicao){
            setTrocarCliente(!trocarCliente);
        }
    }

    async function escolherCliente(clienteRecebido){
        if(cliente.id_cliente !== clienteRecebido.id_cliente){
            controleJanelaCliente();
            setCliente(clienteRecebido); 

            let res = await FetchApi.consultaGet(`/ultimoEvento/${clienteRecebido.id_cliente}`);
            
            if(res.evento.length > 0){
                setUltimoEvento(res.evento[0]);
            }
            //props.setAtualizarEnderecoEvento(true);
            props.setAtualizarEnderecoEvento = true;
            
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
        </div>
    )
}

export default TelaDadosCliente;