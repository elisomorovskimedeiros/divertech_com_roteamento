import { useEffect, useState } from "react";
import Modal from "../../Modal";
import ListaDeBrinquedosNoEvento from "../../Brinquedos/ListaDeBrinquedosNoEvento";
import { FetchApi } from "../../../Controller/FetchApi";

function JanelaDeReagendamento(props){
    const [data, setData] = useState(props.evento.data_evento);
    const [brinquedosOcupados, setBrinquedosOcupados] = useState(props.evento.brinquedos);
    const [dataModificada, setDataModificada] = useState(false);
    useEffect(() => {
        async function verificarSeDisponivel(){
            let resp = await FetchApi.consultaGet(`/brinquedos/data/${data}`);
            let brinquedosVagos = resp.brinquedo.resultado;
            let brinquedosOcupadosProv = [];
            if(data !== props.evento.data_evento){
                setDataModificada(true);
            }
            props.evento.brinquedos.forEach(brinquedo => {
                let vago = false;
                brinquedosVagos.forEach(brinquedoVago => {
                    if(String(brinquedoVago.id_brinquedo) === String(brinquedo.id_brinquedo)){
                        vago = true;
                        return;
                    }
                });
                if (!vago){
                    brinquedosOcupadosProv.push(brinquedo);
                }
            });
            setBrinquedosOcupados(brinquedosOcupadosProv);
        }
        verificarSeDisponivel();
    }, [data]);

    function manipuladorDaJanelaDeBrinquedos(){
        if(props.evento.data_evento !== data){
            if(brinquedosOcupados.length === 0){
                return(
                    <h2>Os brinquedos estão disponíveis para essa data</h2>
                )
            }else{
                return (
                    <div>
                        <h2>Os seguintes brinquedos não estão vagos para a data:</h2>
                        <ListaDeBrinquedosNoEvento brinquedos={brinquedosOcupados} pb = {true} />
                    </div>
                )
            }
        }
    }

    function reagendarMesmo(){
        props.realizarReagendamento(data, brinquedosOcupados);
        props.controle(false);
    }

    return(
        <Modal controle={ props.controle } titulo={"Reagendamento"}>
            <h2>Reagendar o evento para a data?</h2>
            <input type="date" onChange={(e) => setData(e.target.value)} value = {data} />
            {manipuladorDaJanelaDeBrinquedos()}
            <div className="espacoAntes flexNaoResponsivo">
                {dataModificada && <button onClick = {reagendarMesmo} className="btn btnBrancoAzul">Confirmar</button>}
                <button onClick = {() => props.controle(false)} className="btn btnBrancoVermelho">Cancelar</button>
            </div>            
        </Modal>
    );
}

export default JanelaDeReagendamento;