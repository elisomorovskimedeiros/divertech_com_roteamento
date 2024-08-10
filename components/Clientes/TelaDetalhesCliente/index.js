import Modal from "../../Modal";
import NovoCliente from "../NovoCliente";
export default function(props){
    return(
        <Modal controle={props.controle}>
            <NovoCliente cliente={props.cliente} controle={props.controle}/>
        </Modal>
    );
}