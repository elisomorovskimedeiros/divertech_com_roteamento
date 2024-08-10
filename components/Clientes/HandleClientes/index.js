import { useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";

import { ContextoGlobal } from '../../../contexts/variaveisGlobais'
import { FetchApi } from "../../../Controller/FetchApi";

const FaPlus = <FaIcons.FaPlus size = {40}/>
const FaSearch = <FaIcons.FaSearch size = {40}/>


function HandleClientes(){
    const [exibirCampoBusca, setExibirCampoBusca] = useState(false);
    const { setClientes, conteudoDaTela, setConteudoDaTela } = useContext(ContextoGlobal);
    const id = useRef('');
    const cpf = useRef('');
    const nome = useRef('');
    const endereco = useRef('');
    const cidade = useRef('');
    const data = useRef('');

    function handlerExibirBusca(){
        if(exibirCampoBusca){
            setExibirCampoBusca(false);
        }else{
            setExibirCampoBusca(true);
            setConteudoDaTela({});
        }
    }

    async function filtroDeClientes(e){
        let parametrosDeBusca = '';
        if(e.target.id !== 'filtroIdCliente'){
            if(e.target.value.length > 2){
                parametrosDeBusca = '/clientes/'+cpf.current.value+','+nome.current.value+','+
                endereco.current.value+','+cidade.current.value+','+data.current.value;
                document.getElementById('filtroIdCliente').value = '';
            }else{
                return;
            }           
        }else{
            parametrosDeBusca = '/cliente/'+id.current.value;
            document.getElementById('filtroCpfCliente').value = '';
            document.getElementById('filtroNomeCliente').value = '';
            document.getElementById('filtroEnderecoCliente').value = '';
            document.getElementById('filtroCidadeCliente').value = '';            
        }
        
        let clientesProv = (await FetchApi.consultaGet(parametrosDeBusca));
        console.log(clientesProv)
        setClientes(clientesProv.cliente?.resultado? clientesProv.cliente.resultado: []);
    }

    return (
        <div className="espacoAntes PainelDeControle opcoesClientes">
            <div className= 'espacoAntes btnNovoEvento espacoEsquerda espacoDireita linkFake'>
                <Link to={'/clientes/new'} onClick={() => setExibirCampoBusca(false)} className='flexNaoResponsivo  justifyContentBetween campoDestacado'>
                    <div>
                        {FaPlus}
                    </div>
                    <div className='espacoEsquerda'>
                        NOVO CLIENTE
                    </div>
                </Link>
                <Link  to={'/clientes/find'} onClick={handlerExibirBusca} className={`flexNaoResponsivo espacoAntes justifyContentBetween campoDestacado ${exibirCampoBusca? 'cancelarBackGroundColor': ''}`}>
                    <div>
                        {FaSearch}
                    </div>
                    <div className='espacoEsquerda'>
                        PROCURAR CLIENTE
                    </div>
                </Link>
            </div>
            
            {exibirCampoBusca && 
                <div className="espacoAoRedor padding5px campoDestacado divFlex espacoDepois">
                    <div className="dividirTelaEmDuasDivs">
                        <input type='text' ref={id} id='filtroIdCliente' onChange={filtroDeClientes} className="height30px" placeholder="Id do Cliente"/>
                    </div>
                    <div className="dividirTelaEmDuasDivs espacoAntes">
                        <input type='text' ref={cpf} id='filtroCpfCliente' onChange={filtroDeClientes} className="height30px" placeholder="CPF ou CNPJ do Cliente"/>
                    </div>
                    
                    <div className="dividirTelaEmDuasDivs espacoAntes">
                        <input type='text' ref={nome} id='filtroNomeCliente' onChange={filtroDeClientes} onClick={(e) => e.target.select()} className='height30px' placeholder="Nome do Cliente"/>
                    </div>
                    <div className="dividirTelaEmDuasDivs espacoAntes">
                        <input type='text' ref={endereco} id='filtroEnderecoCliente' onChange={filtroDeClientes} onClick={(e) => e.target.select()} className='height30px' placeholder='Endereço' />
                    </div>
                    <div className="dividirTelaEmDuasDivs espacoAntes">
                        <input type='text' ref={cidade} id='filtroCidadeCliente' onChange={filtroDeClientes} onClick={(e) => e.target.select()} className='height30px' placeholder='Cidade' />
                    </div>
                    <div className="dividirTelaEmDuasDivs espacoAntes espacoDepois">
                        <div>    
                            <label>Data de algum evento</label>
                        </div>
                        <div >    
                            <input  ref={data} id='filtroDataUltimoEventoCliente' onChange={filtroDeClientes} className='height30px dataEstilizado' type='date'/>
                        </div>
                    </div>
                </div>                
            }   
        </div>
    )
}

export default HandleClientes;