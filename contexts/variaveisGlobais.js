import { useState, createContext, useEffect } from "react";
import { toast } from "react-toastify";

export const ContextoGlobal = createContext({});

function ProvedorVariaveisGlobais({children}){
    const [larguraTela, setLarguraTela] = useState(window.outerWidth);
    const [mostrarOpcoes, setMostrarOpcoes] = useState(true);
    const [conteudoDaTela, setConteudoDaTela] = useState(
        {
            mensagemDeTopo: 'Nada a exibir',
            conteudo: undefined
        }
    );
    const [eventos, setEventos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [mensagemToast, setMensagemToast] = useState(null);
    const [exibirToast, setExibirToast] = useState(false); 
    const [brinquedos, setBrinquedos] = useState(null);
    const [brinquedoSelecionado, setBrinquedoSelecionado] = useState(null);
    let msgRecebida = '';
    let configToast = null;
    const mensagem  = (msg, cfg) => {
        msgRecebida = msg;
        if (cfg){
            configToast = cfg;
        }else{
            configToast = {theme: 'dark'}
        }
    };
    const notify = () => toast(msgRecebida, configToast);
    
    return(
        < ContextoGlobal.Provider value={{
            larguraTela, 
            setLarguraTela,
            conteudoDaTela,
            setConteudoDaTela,
            eventos, 
            setEventos,
            mostrarOpcoes,
            setMostrarOpcoes,
            clientes,
            setClientes,
            mensagemToast,
            setMensagemToast,
            exibirToast,
            setExibirToast,
            brinquedos,
            setBrinquedos,
            brinquedoSelecionado,
            setBrinquedoSelecionado,
            notify,
            mensagem
        }}>
            {children}
        </ContextoGlobal.Provider>
    )
}

export default ProvedorVariaveisGlobais;