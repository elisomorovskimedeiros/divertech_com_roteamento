import { useEffect } from "react";
import * as FaIcons from "react-icons/fa";
const FaWindowClose = <FaIcons.FaWindowClose size = {40} />
//enviar classes em formato de frase, com espaço entre as palavras
export default function Modal({children, controle, titulo, classes}){
    function handleClose(){
        controle(false);
    }

    return(
        <>
            <div className='capa'></div>
            <fieldset className={`modal fieldset borda_vermelha ${classes && classes}`}>
                
                <div className="alinharNasPontas linkFake">
                    {titulo?<h1 >{titulo}</h1>: ''}
                    <h2 onClick={() => handleClose()}>{FaWindowClose}</h2>
                </div>
                {children}
            </fieldset>
        </>
    )
}