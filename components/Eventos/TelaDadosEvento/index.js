import { useState, useRef, useEffect } from 'react';

import { mascaraDinheiro, transformarDataPortuguesParaDataIngles, retornaApenasNumeros, transformarDataDBParaDataPortugues } from '../../../Controller/funcoesVariadas';

function TelaDadosEvento(props){
    /* const [desconto, setDesconto] = useState(0);
    const [sinal, setSinal] = useState(0);
    const [valorTotal, setValorTotal] = useState(0); */
    const [valorAReceber, setValorAReceber] = useState(0);

    //refs do formulário
    
    const logradouro = useRef(null), data = useRef(null), numero = useRef(null), bairro = useRef(null),
        cidade = useRef(null), complemento = useRef(null), observacao = useRef(null), observacao_evento = useRef(null),
        possui_local_abrigado = useRef(null), status = useRef(null);

    
    
    

    
    

 
    //envia false para o controle recebido do component pai
    /*function fechar(){
        foiEditado = false;
        props.controle(false);
    }

    function DesejaSalvarAsAlteracoes(){
        function sairSalvando(e){
            e.preventDefault();
            props.ok();
        }
        function sairSemSalvar(e){
            e.preventDefault();
            fechar();
        }
        function cancelarFechamento(e){
            e.preventDefault();
            setConfirmacaoDeFechamento(false);
        }
        return(
            <Modal titulo={'Deseja salvar as alterações?'} controle={setConfirmacaoDeFechamento}>
                <div className='flexNaoResponsivo'>
                    <button onClick={sairSalvando} className='bordaBonita btnVerde'>Salvar</button>
                    <button onClick={sairSemSalvar} className='bordaBonita'>Sair sem salvar</button>
                    <button onClick={cancelarFechamento} className='bordaBonita laranja'>Cancelar</button>
                </div>                
            </Modal>
        )
    }*/

    function verificarStatus(){
        let msg, estilo;
        switch(props.evento.status){
            case(0): msg = "Evento Ainda Não Confirmado";
                     estilo = "fundoAzulFraco";
            break;
            case(1): msg = "Evento Confirmado";
                     estilo = "btnVerde";
            break;
            case(2): msg = "Evento Cancelado";
                     estilo = "fundoLaranjaFraco";
            break;
            default: msg = "Status Inválido";
                     estilo = "fundoVermelhoFraco";
            break;            
        }
        return(
            <span className={`bordaBonita ${estilo} padding5px espacoEsquerda`}>
                {msg}
            </span>
        )
    }

    function totalAReceber(){
        return mascaraDinheiro(parseInt(retornaApenasNumeros(props.valorTotal)) - parseInt(retornaApenasNumeros(props.desconto)) - parseInt(retornaApenasNumeros(props.sinal)));
    }

    return(        
        <div className='divFlex'>
            <div>
                <div>
                    <span>
                        Id do Evento:{props.evento.id_evento}
                    </span>                            
                    {verificarStatus()}          
                </div>
                <div>
                    <label htmlFor='data'>Data</label>
                </div>
                <div>
                    <input type="date" id='data' name='data'
                            ref = {data}
                            disabled = {!props.emEdicao}
                    />     
                </div>
                <div>
                    <label htmlFor='logradouro'>Endereço</label>
                </div>
                <div>
                    <input type="text" id='logradouro' name='logradouro'
                            ref = {logradouro}
                            disabled = {!props.emEdicao}
                    />
                    <input type="text" id='numero' name='numero'
                            
                            ref = {numero}
                            disabled = {!props.emEdicao}
                    />                             
                </div>
                <div>
                    <label htmlFor='bairro'>Bairro do evento</label>
                </div>
                <div>
                    <input type="text" id='bairro' name='bairro'
                            ref = {bairro}
                            disabled = {!props.emEdicao}
                    />     
                </div>
                <div>
                    <label htmlFor='cidade'>Cidade do evento</label>
                </div>
                <div>
                    <input type="text" id='cidade' name='cidade'
                            ref = {cidade}
                            disabled = {!props.emEdicao}
                    />     
                </div>
                <div>
                    <label htmlFor='complemento'>Complemento do endereço</label>
                </div>
                <div>
                    <input type="text" id='complemento' name='complemento'
                            ref = {complemento}
                            disabled = {!props.emEdicao}
                    />     
                </div>
                <div>
                    <label htmlFor='observacao'>Observação do endereço</label>
                </div>
                <div>
                    <input type="text" id='observacao' name='observacao'
                            ref = {observacao}
                            disabled = {!props.emEdicao}
                    />     
                </div>
                <div>
                    <label htmlFor='observacao_evento'>Observação sobre o evento</label>
                </div>
                <div>
                    <input type="text" id='observacao_evento' name='observacao_evento'
                            ref = {observacao_evento}
                            disabled = {!props.emEdicao}
                    />     
                </div>
                <div>
                    <label htmlFor='abrigo'>Possui local abrigado?</label>
                </div>
                <div>
                    <input type="text" id='abrigo' name='abrigo'
                            ref = {possui_local_abrigado}
                            disabled = {!props.emEdicao}
                    />     
                </div>
                
                <div>
                    <label htmlFor='valor_total'>Valor Total do Evento</label>
                </div>
                <div>
                    <input type="text" id='valor_total' name='valor_total'
                            value = {mascaraDinheiro(props.valorTotal)}
                            onChange = {(e) => props.setValorTotal(e.target.value)}
                            disabled = {!props.emEdicao}
                    />
                </div>
                <div>
                    <label htmlFor='sinal'>Valor do Sinal</label>
                </div>
                <div>
                    <input type="text" id='sinal' name='sinal'
                            value = {mascaraDinheiro(props.sinal)}
                            onChange = {(e) => props.setSinal(e.target.value)}
                            disabled = {!props.emEdicao}
                    />
                </div>
                <div>
                    <label htmlFor='desconto'>Valor do Desconto</label>
                </div>
                <div>
                    <input type="text" id='desconto' name='desconto'
                            value = {mascaraDinheiro(props.desconto)}
                            onChange = {(e) => props.setDesconto(e.target.value)}
                            disabled = {!props.emEdicao}
                    />
                </div>
                <div>
                    <label htmlFor='valor_a_receber'>Valor a Receber no Ato</label>
                </div>
                <div>
                    {mascaraDinheiro(props.valorAReceber)}
                </div>
            </div>
        </div>
        
    );
}

export default TelaDadosEvento;