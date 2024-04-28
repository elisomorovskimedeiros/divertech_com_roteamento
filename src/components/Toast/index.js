import { useEffect } from "react"

//props.mensagem = mensagem a ser exibida
//props.controle = desativação da função que disparou o toast

export default function Toast(props){
    useEffect(()=>{
        function toast(props){
            let toast = document.getElementById('toast');
            toast.className = 'show';
            if(props.timeOut){
                let timeOut = props.timeOut;
                setTimeout(() => {
                    toast.className = toast.className.replace('show', '');
                    props.controle(false);
                }, timeOut);
            }else{

            }
        }
        toast(props);
    }, []);

    return(
        <div id='toast'>
            {props.mensagem}
        </div>
    )
}