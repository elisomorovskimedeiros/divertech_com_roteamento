import React, {useState, useEffect, useContext} from 'react';

import { CustBarraSuperior } from '../../assets/Customizacoes';
import logo from '../../assets/logo.png';
import { ContextoGlobal } from '../../contexts/variaveisGlobais';

import * as FaIcons from "react-icons/fa";
import { Link } from 'react-router-dom';
import PainelDeControle from '../PainelDeControle';
import Toast from '../Toast';
const FaBars = <FaIcons.FaBars size = {40} />
const FaTimes = <FaIcons.FaTimes size = {40}/>


function OpcoesColapsaveis(props){   
    const {larguraTela} = useContext(ContextoGlobal);
    

    useEffect(() => {
        if(larguraTela < 700){
            props.setColapsado(true);
            props.setMostrarOpcoes(false);
        }else{
            props.setColapsado(false);
            props.setMostrarOpcoes(true);
        }
    },[larguraTela]);

    function ItensQueColapsam(){
        return(
            <div className='flexNaoResponsivo'>
                <div className='itensOpcoesColapsaveis'>
                    Nome do Usuário
                </div>
                <div>
                    <select title='Opções'  className='itensOpcoesColapsaveis'>
                        <option href='#item'>teste</option>
                        <option href='#item'>teste</option>
                        <option href='#item'>teste</option>
                    </select>
                </div>
                <div>
                    <Link to='/' className='itensOpcoesColapsaveis'>
                        Sair
                    </Link>
                </div>                                   
            </div>
        )
    }

    return (
        <>
            {props.colapsado? 
            <div className='espacoAntes'>
                
                
                {props.clicado && 
                    <ItensQueColapsam />
                }
            </div>
            :
            <ItensQueColapsam />
            }
        </>
        
    )
}

function BarraSuperior(){   

    const {setLarguraTela, mostrarOpcoes, setMostrarOpcoes, exibirToast} = useContext(ContextoGlobal);
    const [colapsado, setColapsado] = useState(false);
    const [clicado, setClicado] = useState(false);


    window.addEventListener('resize', () => {
        setLarguraTela(window.innerWidth);
    });


    function handleClick(){
        if(clicado){
            setClicado(false);
            setMostrarOpcoes(false);
        }else{
            setClicado(true);
            setMostrarOpcoes(true);
        }
    }


    return(
        <div id='barraSuperior' >
            <div id='topo' className={`${!colapsado? 'flexNaoResponsivo': ''}`}>
                <div className='flexNaoResponsivo'>
                    <Link id='campoTitulo' to="/"  >
                        <div id='opcoesFixas' >
                            <img
                                alt=""
                                src={logo}
                                width="40"
                                height="40"
                                className="d-inline-block"
                            />
                            <span className='espacoAntes'>
                                {CustBarraSuperior.titulo}
                            </span>   
                        </div>
                    </Link>
                    {colapsado? <div onClick={handleClick} className='linkFake'>
                        <FaIcons.FaBars size = {40} className={clicado? 'bordaBonita': ''}/>                
                    </div>: ''}
                </div>
                <OpcoesColapsaveis 
                    setMostrarOpcoes = {setMostrarOpcoes} 
                    colapsado = {colapsado}
                    setColapsado = {setColapsado}
                    clicado = {clicado}
                    setClicado = {setClicado}
                />
            </div>
            {mostrarOpcoes?
                <PainelDeControle />
                :
                ''
            }
           
            
        </div>
    );
}


export default BarraSuperior;