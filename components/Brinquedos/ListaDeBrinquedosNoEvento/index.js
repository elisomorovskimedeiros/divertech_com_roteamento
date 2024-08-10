import Definicoes from "../../../Controller/Definicoes";

const ListaDeBrinquedosNoEvento = (props) => {
    let brinquedos = [];
    if(brinquedos.hasOwnProperty('brinquedos')){
        brinquedos = props.brinquedos.brinquedos;
    }else{
        brinquedos = props.brinquedos;
    }
    
    
    return(
        <div className=" listaFlexNaoResponsiva ">
            {brinquedos.error ? 
                <div>
                    Não foi possível obter os brinquedos do evento
                </div>
                :
                brinquedos.map((brinquedo, indice)=>{
                    if(brinquedo.hasOwnProperty('error')){
                        return(
                            <div>{brinquedo.error}</div>
                        )
                    } else {
                        return(
                            <div key={indice} className="espacoAntes">
                                <div className="modulo_brinquedo p-2">
                                    <div className="nome_brinquedo letra_bem_pequena">{brinquedo.nome}</div>
                                    <center className="modulo_brinquedo">
                                        <img alt={brinquedo.nome} className="icone_brinquedo" src={`${Definicoes.servidorDeImagens}${brinquedo.imagem? brinquedo.imagem: brinquedo.foto_brinquedo}`} height="40px"  />
                                    </center>
                                </div>
                            </div>
                        )
                    }
                })
                
            }
        </div>
    )
}

export default ListaDeBrinquedosNoEvento;