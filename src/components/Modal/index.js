import * as FaIcons from "react-icons/fa";
const FaWindowClose = <FaIcons.FaWindowClose size = {40} />

export default function Modal({children, controle}){
    function handleClose(){
        controle(false);
    }

    return(
        <>
            <div className="capa"></div>
            <fieldset className="modal fieldset borda_vermelha">
                <div className="alinharADireita linkFake">
                        <div onClick={() => handleClose()}>{FaWindowClose}</div>
                </div>
                {children}
            </fieldset>
        </>
    )
}