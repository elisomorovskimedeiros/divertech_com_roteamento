import { useEffect, useState } from "react";
import Modal from "../../Modal";
import ListaDeBrinquedosNoEvento from "../../Brinquedos/ListaDeBrinquedosNoEvento";
import TelaDeTrocaDeBrinquedosNoEvento from "../../Brinquedos/TelaDeTrocaDeBrinquedosNoEvento";

function TelaDadosBrinquedos(props){
    let brinquedosEditados = false;
    const [brinquedos, setBrinquedos] = useState([]);
    
    const [trocarBrinquedos, setTrocarBrinquedos] = useState(false);
    //useEffect(() => {}, [props.emEdicao]);

    function escolherBrinquedos(){
        if(props.emEdicao){
            brinquedosEditados = true;
            setTrocarBrinquedos(!trocarBrinquedos);
        }
    }
   
    return(
        <div>
            <h1>Brinquedos do Evento</h1>
            <div onClick={escolherBrinquedos} className={`listaDeBrinquedosNoEvento espacoADireita ${props.emEdicao?"editarClienteNoEvento linkFake listaDeBrinquedosNoEventoEmEdicao":''}`}>
                {!(props.brinquedos === undefined || props.brinquedos.length === 0)? <ListaDeBrinquedosNoEvento brinquedos={props.brinquedos} />
                :
                <h1>Evento ainda sem brinquedos</h1>}
            </div>
            {trocarBrinquedos?
                <Modal controle={escolherBrinquedos} classes={'containerTrocaDeBrinquedos'} titulo={"Trocar Brinquedos"}>
                    <TelaDeTrocaDeBrinquedosNoEvento brinquedos={props.brinquedos} setBrinquedos={props.setBrinquedos} data_evento={props.evento.data_evento} controle={escolherBrinquedos}/>
                </Modal>
                : 
            ''} 
        </div>
    )
}

export default TelaDadosBrinquedos;