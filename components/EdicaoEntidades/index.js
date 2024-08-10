import {useEffect, useState} from 'react';

import Modal from '../Modal';
import BuscaDetalhadaClientes from '../Clientes/BuscaDetalhadaClientes';
import Cancelar_Hover from '../../assets/Botoes/Cancelar_Hover.svg';
import Cancelar from '../../assets/Botoes/Cancelar.svg';
import Cancelar_Selecionado from '../../assets/Botoes/Cancelar_Selecionado.svg';
import Confirmar from '../../assets/Botoes/Confirmar.svg';
import Confirmar_Hover from '../../assets/Botoes/Confirmar_Hover.svg';
import Confirmar_Selecionado from '../../assets/Botoes/Confirmar_Selecionado.svg';
import Copiar from '../../assets/Botoes/Copiar.svg';
import Copiar_Hover from '../../assets/Botoes/Copiar_Hover.svg';
import Copiar_Selecionado from '../../assets/Botoes/Copiar_Selecionado.svg';
import Editar from '../../assets/Botoes/Editar.svg';
import Editar_Hover from '../../assets/Botoes/Editar_Hover.svg';
import Editar_Selecionado from '../../assets/Botoes/Editar_Selecionado.svg';
import Reagendar from '../../assets/Botoes/Reagendar.svg';
import Reagendar_Hover from '../../assets/Botoes/Reagendar_Hover.svg';
import Reagendar_Selecionado from '../../assets/Botoes/Reagendar_Selecionado.svg';
import ListaDeBrinquedosNoEvento from '../Brinquedos/ListaDeBrinquedosNoEvento';

function EdicaoEntidades(props){
    let foiEditado = false;
    let chavesOrdenadas = [];
    let brinquedosProv = {};
    const [emEdicao, setEmEdicao] = useState(false);
    const [trocarCliente, setTrocarCliente] = useState(false);
    const [cliente, setCliente] = useState({});
    const [brinquedos, setBrinquedos] = useState({});
    //objetos contendo os botoes, seus nomes e funções associadas
    const [botao1, setBotao1] = useState({botao: Editar, nome: 'Editar'});
    const [botao2, setBotao2] = useState({botao: Confirmar, nome: "Confirmar"});
    const [botao3, setBotao3] = useState({botao: Reagendar, nome: "Reagendar"});
    const [botao4, setBotao4] = useState({botao: Copiar, nome: "Copiar"});
    const [botao5, setBotao5] = useState({botao: Cancelar, nome: "Cancelar"});
    const [botao6, setBotao6] = useState({botao: Confirmar, nome: "OK"});
    
    //array de botoes que irá variar dependendo do tipo de entidade recebida
    const [conjBotoes, setConjBotoes] = useState([]);
    let c = [
        botao1, botao2, botao3, botao4, botao5
    ];

    useEffect(() => {
        //detecção do tipo de entidade recebida para foco na tela (evento, cliente ou brinquedo)
        function btnSelect(){
            if(props.hasOwnProperty("evento")){
                /*c = [
                    botao1, botao2, botao3, botao4, botao5
                ]*/
                setConjBotoes([
                    botao1, botao2, botao3, botao4, botao5
                ]);
            }else if(props.hasOwnProperty("cliente")){
                setConjBotoes([
                    botao1, botao5
                ]);
            }else if(props.hasOwnProperty("brinquedo")){
                setConjBotoes([
                    botao1, botao5
                ]);
            }

                // Função para ordenar as chaves por ordem alfabética, com exceções
            function ordenarChaves(evento){
                // Obter todas as chaves do objeto evento
                const chaves = Object.keys(evento);

                // Ordenar as chaves por ordem alfabética
                chaves.sort((a, b) => a.localeCompare(b));

                // Colocar 'id_evento' e 'logradouro' no início da lista
                const chavesOrdenadas = ['id_evento', 'logradouro', ...chaves.filter(chave => chave !== 'id_evento' && chave !== 'logradouro')];

                // Separar as chaves que contêm 'cliente', 'brinquedos' em objetos separados e colocando semântica na chave
                const clienteObj = {};
                const brinquedosObj = {};
                chavesOrdenadas.forEach(chave => {
                    if (chave.includes('nome_cliente')) {
                        clienteObj[chave] = evento[chave];
                    }
                    if (chave.includes('brinquedos')) {
                        brinquedosObj[chave] = evento[chave];
                    }
                });

                // Retornar as chaves ordenadas e o objeto cliente separado
                
                return { chavesOrdenadas, clienteObj, brinquedosObj };
            };

            const { chaves, clienteObj, brinquedosObj } = ordenarChaves(props.evento);
            setCliente(clienteObj);
            brinquedosProv = brinquedosObj;
            setBrinquedos(brinquedosObj);
            chavesOrdenadas = chaves;
        }
        btnSelect();
    },[]);

    function funcao(e){
        switch(e.target.alt){
            case 'Editar': editar();
            break;
            case 'Editando': editar();
            break;
            case 'Cancelar': cancelar();
            break;
            default: console.log(e.target.alt);
        }
    }

    function editar(){
        let btnProv = botao1;
        let inputs = document.getElementsByTagName('input');
        foiEditado = true;
        if(emEdicao){
            btnProv.nome = "Editar";
            btnProv.botao = Editar;
            setConjBotoes([botao1, botao2, botao3, botao4, botao5]);
            //para iterar o HTMLCollection inputs eu poderia também usar:
            //Array.from(inputs).forEach(input => {input.disabled = false});
            for(let input of inputs){
                input.disabled = true;
            }
        }else{
            btnProv.nome = "Editando";
            btnProv.botao = Editar_Selecionado;
            setConjBotoes([botao1, botao6, botao5]);
            for(let input of inputs){
                input.disabled = false;
            }
        }
        setBotao1(btnProv);
        setEmEdicao(!emEdicao);
    }

    function confirmar(){
        
    }

    function reagendar(){
        
    }

    function copiar(){
        
    }

    function cancelar(){
        props.controle(false);
    }
    
    //envia false para o controle recebido do component pai
    function fechar(){
        props.controle(false);
    }

    function escolherCliente(cliente){
        controleJanelaCliente();
        setCliente(cliente);
    }

    function controleJanelaCliente(){
        if(emEdicao){
            setTrocarCliente(!trocarCliente);
        }
    }


    //setCliente(clienteObj);
    //console.log(clienteObj)

    function semanticaChave(chave){
        chave = (chave.charAt(0).toUpperCase()+chave.slice(1));
        while(chave.includes('_')) {
            chave = chave.replace('_', ' do ');
        }
        return chave;
    }

    return(
        <div id="telaEdicaoEntidades">
            <center className="campoTopo flex flexNaoResponsivo linkFake">
                {conjBotoes.map((botao) => {
                    return(
                        <div onClick={funcao} key={botao.nome} className='opcaoTelaEdicao'>
                            <div className='imagemOpcao'>
                                <img src={botao.botao} alt={botao.nome} width={70}/>
                            </div>
                            <div className='nomeOpcao'>
                                {botao.nome}
                            </div>
                        </div>
                    )
                })}
                
            </center>
            <hr />
            <div id="campoForumulario">
                <form>
                    <div onClick={controleJanelaCliente} className={`clienteNoEvento ${emEdicao?"editarClienteNoEvento linkFake":''}`}>
                        <div>
                            <h3>Cliente</h3>
                        </div>
                        <div>
                            {/* Renderizar objeto cliente separado */}
                            { Object.keys(cliente).length > 0 && (
                                <div>
                                    {Object.keys(cliente).map(chave => (
                                        <div key={chave}>
                                            {cliente[chave]}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    {trocarCliente && <BuscaDetalhadaClientes controle={controleJanelaCliente} 
                                                            escolherCliente={escolherCliente}/>}
                    <hr />
                    {/* Renderizar campos que não são 'cliente' */}
                    <div className='divFlex'>
                        {chavesOrdenadas.map(chave => (
                            !((chave.includes('cliente')) || (chave.includes('brinquedos'))) && (
                                <div key={chave} className='col3Responsivo'>
                                    <div>
                                        <label htmlFor={chave}>{semanticaChave(chave)}</label>
                                    </div>
                                    <div>
                                        {chave === 'id_evento'?
                                            <span>
                                                {props.evento[chave]?props.evento[chave]:''}
                                            </span>
                                            :
                                            <input
                                                type="text"
                                                id={chave}
                                                name={chave}
                                                value={props.evento[chave]?props.evento[chave]:''}
                                                disabled
                                            />
                                        }                                    
                                    </div>
                                </div>
                                )
                            )
                        )}
                    </div>
                    <div>
                        {<ListaDeBrinquedosNoEvento brinquedos={brinquedos? brinquedos: brinquedosProv} />}
                    </div>                    
                </form>
            </div>
        </div>
    )
}

export default EdicaoEntidades;