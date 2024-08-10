import { useRef, useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

import {FetchApi}  from "../../../Controller/FetchApi";
const {consultaGet} = FetchApi;
//para fechar envio props.controle recebendo false
//para escolher o cliente execute a função props.escolherCliente(cliente)
export default function BuscaDetalhadaClientes(props){
    const cpf = useRef('');
    const nome = useRef('');
    const endereco = useRef('');
    const cidade = useRef('');
    const data = useRef('');
 
    const [listaClientes, setListaClientes] = useState([]);
    let zIndex = 10;
    
    useEffect(() => {
        let parent = document.getElementsByClassName('miniJanelaDeEscolha')[0].parentElement;
        //console.log(parent);
        let parentZIndex = window.getComputedStyle(parent).zIndex;
        if(parentZIndex !== 'auto'){
            zIndex = parseInt(parentZIndex)+1;
        }
    }, []);


    //solicitação com filtro mais detalhado
        //[0]: cpf
        //[1]: nome
        //[2]: logradouro
        //[3]: cidade
        //[4]: data de algum evento do cliente

    async function handlerBuscaDetalhadaCliente(){
        if(cpf.current.value.length > 2 || nome.current.value.length > 2 || endereco.current.value.length > 2 || cidade.current.value.length > 2 || data.current.value !== ''){
            
            let listaClientesProv = await consultaGet(`/clientes/${cpf.current?.value},${nome.current?.value},${endereco.current?.value},${cidade.current?.value},${data.current.value}`);

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
        <div className="capa">
            <div className="miniJanelaDeEscolha" style={{zIndex: zIndex}}>                        
                <fieldset className="fieldset">
                    <div>
                        <div className="alinharADireita linkFake">
                            <FaTimes size={30}  onClick={props.controle}/>
                        </div>
                        <div>
                            <h4>Diga algo que sabe do cliente:</h4>
                        </div>       
                    </div>
                    <input type='number' ref={cpf} onClick={(e) => e.target.select()} onChange={handlerBuscaDetalhadaCliente} placeholder='CPF' />
                    <input type='text' ref={nome} onClick={(e) => e.target.select()} onChange={handlerBuscaDetalhadaCliente} placeholder='Nome' />
                    <input type='text' ref={endereco} onClick={(e) => e.target.select()} onChange={handlerBuscaDetalhadaCliente} placeholder='Endereço' />
                    <input type='text' ref={cidade} onClick={(e) => e.target.select()} onChange={handlerBuscaDetalhadaCliente} placeholder='Cidade' /><br/>
                    <label>Data de algum evento</label>
                    <input  ref={data} className='form-control date espacoEsquerda' onChange={handlerBuscaDetalhadaCliente} type='date'/>
                </fieldset>
                <div>
                    {listaClientes && listaClientes.length > 0? <h5 className="espacoAntes">Clientes encontrados:</h5>: ''}
                    
                    {listaClientes?.map((cliente, indice) => {
                        return(
                            <div key={indice} onClick={() => props.escolherCliente(cliente)} className="linkFake">
                                {cliente.nome}
                                <hr/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>

    );
}