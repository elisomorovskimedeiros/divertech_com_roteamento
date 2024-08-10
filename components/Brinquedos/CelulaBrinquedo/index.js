import { CustAPI } from "../../../Controller/Customizacoes";
//receber objeto brinquedo e o indice do brinquedo na iteração
export default function CelulaBrinquedo(props){
    
    return(
        <div key={props.indice} className="draggable"
            draggable={true}
            onDragStart={(e) => props.handleDragStart(e, props.brinquedo)}
            onTouchStart ={(e) => props.handleDragStart(e, props.brinquedo)}
        >
            <center className={`modulo_brinquedo filho ${props.indice}`}>
                <div className={`nome_brinquedo letra_bem_pequena neto ${props.indice}`}>{props.brinquedo.nome? props.brinquedo.nome: props.brinquedo.nome_brinquedo}</div>
                <div className={`modulo_brinquedo neto ${props.indice}`}>
                    <img alt={props.brinquedo.nome? props.brinquedo.nome: props.brinquedo.nome_brinquedo} 
                        className={`icone_brinquedo bisneto ${props.indice}`} 
                        src={CustAPI.enderecoImagemBrinquedos + (props.brinquedo.imagem? props.brinquedo.imagem: props.brinquedo.foto_brinquedo)} height="40px"  />
                </div>
            </center>
        </div>
    )
}