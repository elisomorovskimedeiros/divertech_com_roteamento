import React, {useEffect, useState} from 'react';
import Cancelar from '../../assets/Botoes/Cancelar.svg'
import Botao from '../BotoesEdicao/Botao';

//Edicao de entidades recebe em props.entidade seu elemento filho
function EdicaoEntidades(props){
    const [conjBotoesTopo, setConjBotoesTopo] = useState([]);
    const [entidadeEditada, setEntidadeEditada] = useState(null);
    const [primeiroBotao, setPrimeiroBotao] = useState(null);
    const [ultimoBotao, setUltimoBotao]  = useState(null);
    
    useEffect(() => {
        function setUp(){
            //aqui são inseridos como props do elemento filho os métodos de controle do elemento pai
            setEntidadeEditada(
                React.cloneElement(
                    props.entidade, { 
                        setConjBotoesTopo: ordenar,
                        controle: props.controle
                    }
                )
            );
        }
        setUp();
    }, []);

        function ordenar(listaBotoes){
        let novaLista = [];
        listaBotoes.forEach((botao) => {
            switch(botao.props.nome){
                case "OK": setPrimeiroBotao(botao);
                break;
                case "Fechar": setUltimoBotao(botao);
                break;
                default: novaLista = [...novaLista, botao];
            }
        });
        setConjBotoesTopo(novaLista);
    }

    return(
        <div id="telaEdicaoEntidades">
            <center className="flex flexNaoResponsivo">
                {primeiroBotao &&
                    <div  className="linkFake flexNaoResponsivo">
                        {primeiroBotao}
                        {ultimoBotao}
                    </div>
                }
                
                <div className="divFlex">
                    <div className=" flex campoTopo flexNaoResponsivo linkFake">
                        {conjBotoesTopo?.map((botao) => {
                            return botao;
                        })}
                    </div>
                    
                    {!primeiroBotao &&
                    <div  className="linkFake">
                        {ultimoBotao}
                    </div>
                } 
                </div>                 
            </center>
            <hr />
            {entidadeEditada}        
        </div>
    )
}

export default EdicaoEntidades;