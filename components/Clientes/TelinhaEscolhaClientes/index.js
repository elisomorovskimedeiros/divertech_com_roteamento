export default function TelinhaEscolhaClientes(props){


    return(
        <div id="celulaEscolhaCliente" className="miniJanelaDeEscolha linkFake">
            {props.listaDeClientes?.map((cliente) => {
                return(
                    <div key={cliente.id_cliente} onClick={() => props.handleSelecaoCliente(cliente.id_cliente)}>
                        {cliente.nome}
                        <hr/>
                    </div>
                )
            })}
        </div>
    )
}

