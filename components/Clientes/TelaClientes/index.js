import { useContext, useEffect, useState } from "react";
import { ContextoGlobal } from "../../../contexts/variaveisGlobais";
import { FetchApi } from "../../../Controller/FetchApi";

import TelaDetalhesCliente from "../TelaDetalhesCliente";

export default function TelaClientes(){
    const {clientes, setClientes} = useContext(ContextoGlobal);
    const [selecaoDeCliente, setSelecaoDeCliente] = useState(false);
    const [clienteSelecionado, setClienteSelecionado] = useState(null);
    console.log(clientes);
    useEffect(() => {
        async function clientesProximos15Dias(){
            let clientesProv = await FetchApi.consultaGet('/clientes');
            clientesProv = clientesProv.cliente.resultado;
            setClientes(clientesProv);
        }

        clientesProximos15Dias();
    }, []);

    function selecionarCliente(cliente){
        setClienteSelecionado(cliente);
        setSelecaoDeCliente(true);
    }

    return(
        <div>
            <div className="row">
                {clientes && clientes.map((cliente, indice) => {
                    return(         
                        <div key={indice} className="col-xl-6 float link_fake">
                            <div className="celula celulaEvento">
                                <fieldset className="field_set_modulo_evento borda_azul" onClick={() => selecionarCliente(cliente)}>
                                    <legend className="w-auto"><span className="idListaEventos">{cliente.nome}</span></legend>
                                    <div className="container">
                                        <div className="row container">
                                            <div className="col-md-2  semPadding">
                                                <span className='nomeClienteListaEventos'>Id: {cliente.id_cliente}</span>
                                            </div>                                    
                                            <div className="col-md-5 semPadding">
                                                <span>Telefone: </span><span className="telefone_cliente">{cliente.telefone}</span>
                                            </div>
                                            <div className="col-md-5 semPadding">
                                                <span>Recado: </span><span className="telefone_recado">{cliente.telefone_recado}</span>
                                            </div>
                                            <div className="col-md-12 semPadding">
                                                <span>Endereço: </span><span>{cliente.logradouro}, {cliente.numero}</span>
                                            </div>
                                            <div className="col-md-12 semPadding">
                                                <span>Bairro: </span><span>{cliente.bairro? cliente.bairro:'Não informou'}, {cliente.cidade}</span>
                                            </div>
                                        </div>
                                    </div>                                
                                </fieldset>
                            </div>
                        </div>
                    )
                }
                )}
            </div>
            {selecaoDeCliente? <TelaDetalhesCliente controle={setSelecaoDeCliente} cliente={clienteSelecionado}/>: ''}
        </div>
    )
}