import { useState, useRef, useEffect } from 'react';

import { mascaraDinheiro, transformarDataPortuguesParaDataIngles, retornaApenasNumeros, transformarDataDBParaDataPortugues } from '../../../Controller/funcoesVariadas';

function TelaDadosEvento(props){
    const [evento, setEvento] = useState(props.evento);
    const [desconto, setDesconto] = useState(0);
    const [sinal, setSinal] = useState(0);
    const [valorTotal, setValorTotal] = useState(0);
    const [valorAReceber, setValorAReceber] = useState(0);

    //refs do formulário
    
    const logradouro = useRef(null), data = useRef(null), numero = useRef(null), bairro = useRef(null),
        cidade = useRef(null), complemento = useRef(null), observacao = useRef(null), observacao_evento = useRef(null),
        possui_local_abrigado = useRef(null), status = useRef(null);

    useEffect(() => {
        function setUp(){
            //setando valores iniciais dos inputs
            document.getElementById('data').value = transformarDataPortuguesParaDataIngles(props.evento?.data_evento);
            document.getElementById('logradouro').value = props.evento?.logradouro_evento;
            document.getElementById('numero').value = props.evento?.numero_evento;
            document.getElementById('bairro').value = props.evento.bairro_evento;
            document.getElementById('cidade').value = props.evento.cidade_evento;
            document.getElementById('complemento').value = props.evento.complemento_evento;
            document.getElementById('observacao').value = props.evento.observacao_endereco_evento;
            document.getElementById('observacao_evento').value = props.evento.observacao_evento;                
            document.getElementById('abrigo').value = props.evento.abrigo;
            setSinal(props.evento.valor_sinal? props.evento.valor_sinal: 0);
            setDesconto(props.evento.valor_desconto? props.evento.valor_desconto: 0);
            setValorTotal(props.evento.valor_total? props.evento.valor_total: 0);
            //setValorAReceber(mascaraDinheiro(totalAReceber()));
            setValorAReceber(totalAReceber());
        }
        setUp();
    }, []);
    
    useEffect(() => {
        setValorAReceber(totalAReceber());
    }, [sinal, desconto, valorTotal]);

    function verificarStatus(){
        let msg, estilo;
        switch(evento.status){
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
        return mascaraDinheiro(parseInt(retornaApenasNumeros(valorTotal)) - parseInt(retornaApenasNumeros(desconto)) - parseInt(retornaApenasNumeros(sinal)));
    }

    return(        
        <div className='divFlex'>
            <div>
                <div>
                    <span>
                        Id do Evento:{evento.id_evento}
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
                            value = {mascaraDinheiro(valorTotal)}
                            onChange = {(e) => setValorTotal(e.target.value)}
                            disabled = {!props.emEdicao}
                    />
                </div>
                <div>
                    <label htmlFor='sinal'>Valor do Sinal</label>
                </div>
                <div>
                    <input type="text" id='sinal' name='sinal'
                            value = {mascaraDinheiro(sinal)}
                            onChange = {(e) => setSinal(e.target.value)}
                            disabled = {!props.emEdicao}
                    />
                </div>
                <div>
                    <label htmlFor='desconto'>Valor do Desconto</label>
                </div>
                <div>
                    <input type="text" id='desconto' name='desconto'
                            value = {mascaraDinheiro(desconto)}
                            onChange = {(e) => setDesconto(e.target.value)}
                            disabled = {!props.emEdicao}
                    />
                </div>
                <div>
                    <label htmlFor='valor_a_receber'>Valor a Receber no Ato</label>
                </div>
                <div>
                    {valorAReceber}
                </div>
            </div>
        </div>
        
    );
}

export default TelaDadosEvento;