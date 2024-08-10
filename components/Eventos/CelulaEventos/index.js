
const ListaDeBrinquedosNoEvento = (props) => {
    let evento = props.evento;    
    return(
        <div className=" listaFlexNaoResponsiva ">
            {evento.brinquedos.error ? 
                <div>
                    Não foi possível obter os brinquedos do evento
                </div>
                :
                evento.brinquedos.map((brinquedo, indice)=>{
                    if(brinquedo.hasOwnProperty('error')){
                        return(
                            <div>{brinquedo.error}</div>
                        )
                    } else {
                        return(
                            <div key={indice} className="espacoAntes">
                                <div className="modulo_brinquedo p-2">
                                    <div className="nome_brinquedo letra_bem_pequena">{brinquedo.nome}</div>
                                    <center className="modulo_brinquedo">
                                        <img alt={brinquedo.nome} className="icone_brinquedo" src={"http://localhost:9000/imagem/"+brinquedo.imagem} height="40px"  />
                                    </center>
                                </div>
                            </div>)
                        }
                })
                
            }
        </div>
    )
}

export default function CelulaEvento(props){


    return(
            <div onClick={() => props.handlerEdicaoEvento(props.evento)} className="width300 linkFake">
                <fieldset className="field_set_modulo_evento borda_azul">
                    <legend className=""><span>Evento id: </span><span className="idListaEventos">{props.evento.id_evento}</span></legend>
                    <div >
                        <div className=" "><span className='nomeClienteListaEventos'>{props.evento.nome_cliente}</span></div>
                        <div className=" dataListaEventos"><span>Data:&nbsp;</span><span>{props.evento.data_evento}</span></div><div className=""><span>Valor a receber:&nbsp;R$</span><span>{props.evento.valor_total},00</span></div>
                        <div className="">
                            <span>Telefone: </span><span className="telefone_cliente">{props.evento.telefone}</span>
                        </div>
                        <div className="">
                            <span>Telefone Recado: </span><span className="telefone_recado">{props.evento.telefone_recado}</span>
                        </div>
                        <div className="">
                            <span>Status: </span><span className="status">{props.evento.status}</span>
                        </div>
                        <div>
                            <span>Endereço: </span>
                            <span className="status">
                                {props.evento.logradouro_evento? props.evento.logradouro_evento : ''}
                                {props.evento.numero_evento? ', ' + props.evento.numero_evento : ''}
                                {props.evento.bairro_evento? ', ' + props.evento.bairro_evento : ''}
                                {props.evento.cidade_evento? ', ' + props.evento.cidade_evento : ''}
                                {props.evento.complemento_evento? ', ' + props.evento.complemento_evento : ''}
                                {props.evento.observacao_endereco_evento? ', ' + props.evento.observacao_endereco_evento : ''}
                            </span>
                        </div>
                        <div className=" enderecoListaEventos"></div>
                        <div className="">
                            Brinquedos:
                        </div>
                        <div>
                            <ListaDeBrinquedosNoEvento evento={props.evento} />                                            
                        </div>
                    </div>
                </fieldset>
            </div>
        
    )    
}