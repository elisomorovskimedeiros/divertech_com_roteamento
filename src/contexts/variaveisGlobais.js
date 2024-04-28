import { useState, createContext, useEffect } from "react";

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
            setClientes
        }}>
            {children}
        </ContextoGlobal.Provider>
    )
}

export default ProvedorVariaveisGlobais;