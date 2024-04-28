import { useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";

import {FetchApi}  from "../../../Controller/FetchApi";
const {consultaGet} = FetchApi;

//para escolher o cliente execute a função props.escolherCliente(cliente)
export default function BuscaDetalhadaClientes(props){
    const cpf = useRef('');
    const nome = useRef('');
    const endereco = useRef('');
    const cidade = useRef('');
    const data = useRef('');

    const [listaClientes, setListaClientes] = useState([]);

    //solicitação com filtro mais detalhado
        //[0]: cpf
        //[1]: nome
        //[2]: logradouro
        //[3]: cidade
        //[4]: data de algum evento do cliente

    async function handlerBuscaDetalhadaCliente(){
        if(cpf.current.value.length > 2 || nome.current.value.length > 2 || endereco.current.value.length > 2 || cidade.current.value.length > 2 || data.current.value !== ''){
            console.log(`/clientes/${cpf.current?.value},${nome.current?.value},${endereco.current?.value},${cidade.current?.value},${data.current.value}`);
            let listaClientesProv = await consultaGet(`/clientes/${cpf.current?.value},${nome.current?.value},${endereco.current?.value},${cidade.current?.value},${data.current.value}`);
            console.log(listaClientesProv);
            if(listaClientesProv.cliente.resultado){
                setListaClientes(listaClientesProv.cliente.resultado);
            }else{
                setListaClientes([]);
            }
        }else{
            setListaClientes([]);
        }
    }
    
    return(
        <div className="miniJanelaDeEscolha">                        
            <fieldset className="fieldset">
                <div className="flexNaoResponsivo">
                    <h4>Diga algo que sabe do cliente:</h4>
                    <FaTimes size={30}  onClick={props.abrirFormFiltrarCliente}/>
                </div>
                <input type='number' ref={cpf} onClick={(e) => e.target.select()} onChange={handlerBuscaDetalhadaCliente} placeholder='CPF' />
                <input type='text' ref={nome} onClick={(e) => e.target.select()} onChange={handlerBuscaDetalhadaCliente} placeholder='Nome' />
                <input type='text' ref={endereco} onClick={(e) => e.target.select()} onChange={handlerBuscaDetalhadaCliente} placeholder='Endereço' />
                <input type='text' ref={cidade} onClick={(e) => e.target.select()} onChange={handlerBuscaDetalhadaCliente} placeholder='Cidade' />
                <label>Data de algum evento</label>
                <input  ref={data} className='form-control' onChange={handlerBuscaDetalhadaCliente} type='date'/>
            </fieldset>
            <div>
                {listaClientes && listaClientes.length > 0? <h5 className="espacoAntes">Clientes encontrados:</h5>: ''}
                
                {listaClientes?.map((cliente, indice) => {
                    return(
                        <div key={indice} onClick={() => props.escolherCliente(cliente)}>
                            {cliente.nome}
                            <hr/>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}