import {useState, useEffect} from 'react';
import CelulaBrinquedo from '../CelulaBrinquedo';
import { FetchApi } from '../../../Controller/FetchApi';
import ContainerSetasDeTroca from '../../ContainerSetasDeTrocas';
import { FaCircleCheck } from 'react-icons/fa6';
import ListaDeBrinquedosNoEvento from '../ListaDeBrinquedosNoEvento';

 

function TelaDeTrocaDeBrinquedosNoEvento(props){
    const [brinquedosNoEvento, setBrinquedosNoEvento] = useState(props.brinquedos);
    const [listaDeBrinquedosVagos, setListaDeBrinquedosVagos] = useState(null);
    let brinquedoEmTransferencia = null;
   
    useEffect(() => {
        async function capturarBrinquedosVagos(){
            let listaDeBrinquedosVagosProv = await FetchApi.consultaGet(`/brinquedos/data/${props.data_evento}`);
            if(!(listaDeBrinquedosVagosProv.brinquedo.status && listaDeBrinquedosVagosProv.brinquedo.resultado.length)){
                listaDeBrinquedosVagosProv = undefined;
            }else{
                listaDeBrinquedosVagosProv = listaDeBrinquedosVagosProv.brinquedo.resultado;
            }
            setListaDeBrinquedosVagos(listaDeBrinquedosVagosProv);
        }
        capturarBrinquedosVagos();
    },[]);

    const handleDragStart = (event, brinquedo) => {
        // Guardar o objeto sendo arrastado em algum estado local
        brinquedo.origem = event.target.className;
        brinquedoEmTransferencia = brinquedo;
        if(event.type === "touchstart"){
            handleDrop(event);
        }
    };

    const handleDrop = (event, targetDiv) => {
        //event.preventDefault();
        let listaDeBrinquedosProv = [];
        if(brinquedoEmTransferencia.origem.includes("Lista_de_brinquedos_vagos")){
            setBrinquedosNoEvento([...brinquedosNoEvento, brinquedoEmTransferencia]);
            
            listaDeBrinquedosVagos.forEach(brinquedo => {
                if(brinquedo.id_brinquedo === brinquedoEmTransferencia.id_brinquedo){
                    if(brinquedo.quantidade > 1){
                        brinquedo.quantidade--;
                    }else{
                        listaDeBrinquedosProv = listaDeBrinquedosVagos.filter((brinq) => brinq.id_brinquedo !== brinquedo.id_brinquedo);
                    }
                }
            });
            if(listaDeBrinquedosProv.length > 0){
                setListaDeBrinquedosVagos(listaDeBrinquedosProv);
            }
        }else if(brinquedoEmTransferencia.origem.includes("Edição_de_brinquedos")){
            let incluiu = false;
            listaDeBrinquedosVagos.forEach((brinquedo) => {
                if(brinquedo.id_brinquedo === brinquedoEmTransferencia.id_brinquedo){
                    brinquedo.quantidade++;
                    incluiu = true;
                    console.log(brinquedo)
                }
                
            });
            if(!incluiu){
                setListaDeBrinquedosVagos([...listaDeBrinquedosVagos, brinquedoEmTransferencia]);
            }
            
            incluiu = false;
            brinquedosNoEvento.forEach((brinquedo) => {                
                if(brinquedo.id_brinquedo !== brinquedoEmTransferencia.id_brinquedo || incluiu){
                    listaDeBrinquedosProv.push(brinquedo);   
                }else{
                    incluiu = true;
                }
            })
            setBrinquedosNoEvento(listaDeBrinquedosProv);
        }
        brinquedoEmTransferencia = null;
    };

    function executarTroca(){
        props.setBrinquedos(brinquedosNoEvento);
        props.controle();
    }

    
    return(
        <div className='divFlex center'>
            <div className='caixaDeTrocaDeBrinquedos' id='brinquedosNoEvento'
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, document.getElementById('brinquedosNoEvento'))}
            >
                <h4>Lista de Brinquedos no Evento:</h4>
                <div className='flexNaoResponsivo'>
                    {brinquedosNoEvento?.map((brinquedo, indice) => {
                        return <CelulaBrinquedo brinquedo={brinquedo} indice={"Edição_de_brinquedos_"+indice} handleDragStart={handleDragStart}/>
                    })}
                </div>
            </div>
            <ContainerSetasDeTroca />
            <div className='caixaDeTrocaDeBrinquedos' id='brinquedosDisponiveis'
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, document.getElementById('brinquedosDisponiveis'))}
            >
                <h4>Lista de brinquedos disponíveis para a data:</h4>
                <div className='flexNaoResponsivo'>
                    {listaDeBrinquedosVagos?.map((brinquedo, indice) => {
                        return <CelulaBrinquedo brinquedo={brinquedo} indice={"Lista_de_brinquedos_vagos_"+indice} handleDragStart={handleDragStart}/>;
                    })}
                </div>
            </div>
            <div className='divNoCantoDireito' onClick={executarTroca}>
                <FaCircleCheck size={60} color='green'/>
            </div>
        </div>
    )
    
}

export default TelaDeTrocaDeBrinquedosNoEvento;