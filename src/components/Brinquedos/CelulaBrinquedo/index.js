import { CustAPI } from "../../../Controller/Customizacoes";

export default function CelulaBrinquedo(props){
    return(
        <div key={props.indice} id="brinquedo_individual">
            <div className="modulo_brinquedo p-2">
                <div className="nome_brinquedo letra_bem_pequena">{props.brinquedo.nome? props.brinquedo.nome: props.brinquedo.nome_brinquedo}</div>
                <div className="modulo_brinquedo">
                    <img alt={props.brinquedo.nome? props.brinquedo.nome: props.brinquedo.nome_brinquedo} className="icone_brinquedo" src={CustAPI.endereco + props.brinquedo.imagem? props.brinquedo.imagem: props.brinquedo.foto_brinquedo} height="40px"  />
                </div>
            </div>
        </div>
    )
}