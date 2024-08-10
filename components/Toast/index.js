import { useEffect, useContext } from "react";
import {ContextoGlobal} from "../../contexts/variaveisGlobais";

//props.mensagem = mensagem a ser exibida
//props.controle = desativação da função que disparou o toast

export default function Toast(props){
    const {exibirToast, setExibirToast, mensagemToast} =  useContext(ContextoGlobal);
    useEffect(()=>{
        function toast(props){
            let toast = document.getElementById('toast');
            toast.className = 'show';
            if(props.timeOut){
                let timeOut = props.timeOut;
                setTimeout(() => {
                    toast.className = toast.className.replace('show', '');
                    setExibirToast(false);
                }, timeOut);
            }else{

            }
        }
        toast(props);
    }, []);
    
    return(
        <div id='toast'>
                {mensagemToast}
        </div>
    )
}