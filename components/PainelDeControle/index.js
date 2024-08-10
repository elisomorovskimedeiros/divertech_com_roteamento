//React
import {React, Component, useState, useEffect, useContext} from 'react';
import * as FaIcons from "react-icons/fa";
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { ContextoGlobal } from '../../contexts/variaveisGlobais';


function PainelDeControle(){
    const {mostrarOpcoes, setMostrarOpcoes} = useContext(ContextoGlobal);
    const [eventosSelecionado, setEventosSelecionado] = useState(false);
    const [clientesSelecionado, setClientesSelecionado] = useState(false);
    const [brinquedosSelecionado, setBrinquedosSelecionado] = useState(false);

    let navigate = useNavigate();
    let location = useLocation();

    useEffect(()=>{
        handleClickOpcao(location.state? location.state.opcao: '');
        location.state && location.state.mostrarOpcoes && setMostrarOpcoes(location.state.mostrarOpcoes);
    },[])

    function handleClickOpcao(opcaoClicada){        
        switch(opcaoClicada){
            case 'eventos':  
                if (eventosSelecionado){
                    setEventosSelecionado(false);
                    navigate('/', {state:{opcao: '' ,mostrarOpcoes: mostrarOpcoes}});
                }else{
                    setEventosSelecionado(true);
                    navigate('/eventos', {state:{opcao: 'eventos', mostrarOpcoes: mostrarOpcoes}});
                    console.log(location)
                }
                setClientesSelecionado(false);
                setBrinquedosSelecionado(false);
            break;
            case 'clientes':  
                if (clientesSelecionado){
                    setClientesSelecionado(false);
                    navigate('/', {state:{opcao: '' ,mostrarOpcoes: mostrarOpcoes}});
                }else{
                    setClientesSelecionado(true);
                    navigate('/clientes', {state:{opcao: 'clientes', mostrarOpcoes: mostrarOpcoes}});
                }
                setEventosSelecionado(false);
                setBrinquedosSelecionado(false);
            break;
            case 'brinquedos':   
                if (brinquedosSelecionado){
                    setBrinquedosSelecionado(false);
                    navigate('/', {state:{opcao: '', mostrarOpcoes: mostrarOpcoes}});
                }else{
                    setBrinquedosSelecionado(true);
                    navigate('/brinquedos', {state:{opcao: 'brinquedos', mostrarOpcoes: mostrarOpcoes}});
                }
                setClientesSelecionado(false);
                setEventosSelecionado(false);
            break;
            default: navigate('/', {state:{opcao: '', mostrarOpcoes: mostrarOpcoes}});
            break;
        }
    }
        
    return(
        <div id='PainelDeControle' className='PainelDeControle'>
            <div className='seletores'>
                <div id='opcoes' className='configOpcoes'>
                    
                    <div className={`opcao linkFake ${eventosSelecionado? 'clicado':''}`} onClick={() => handleClickOpcao('eventos')}>
                        
                        <div>
                            <FaIcons.FaBirthdayCake size = {40} />
                        </div>
                        <div> 
                            <p>
                                EVENTOS
                            </p>
                        </div>
                        
                    </div>

                    <div className={`opcao linkFake ${clientesSelecionado? 'clicado':''}`} onClick={() => handleClickOpcao('clientes')}>
                            
                        <div>
                            <FaIcons.FaUserCircle size = {40}/>
                        </div>
                        <div> 
                            <p>
                                CLIENTES
                            </p>
                        </div>
                        
                    </div>

                    <div className={`opcao linkFake ${brinquedosSelecionado? 'clicado':''}`} onClick={() => handleClickOpcao('brinquedos')}>
                        
                        <div>
                            <FaIcons.FaSnowman size = {40}/>
                        </div>
                        <div> 
                            <p>
                                BRINQUEDOS
                            </p>
                        </div>
                        
                    </div>
                </div>
            </div>  
        </div>            
    )    
    
}

export default PainelDeControle;

