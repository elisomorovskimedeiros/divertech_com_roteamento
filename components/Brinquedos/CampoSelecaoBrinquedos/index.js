import {useState} from 'react';

//components
import Definicoes from "../../../Controller/Definicoes";

const enderecoImagem = Definicoes.servidorDeImagens;

//import CelulaBrinquedo from "./CelulaBrinquedo";
function CampoSelecaoBrinquedos(props){
const listaDeBrinquedosEscolhidos = props.listaDeBrinquedosEscolhidos;
console.log(listaDeBrinquedosEscolhidos);

    function incluirBrinquedo(brinquedo){
        console.log("incluir" + brinquedo.nome_brinquedo);
        //console.log(props.listaDeBrinquedosEscolhidos);
    }

    function excluirBrinquedo(brinquedo){
        console.log("excluir" + brinquedo.nome_brinquedo);
        //console.log(props.listaDeBrinquedosEscolhidos);
    }

    function CelulaBrinquedo(props){
    
        const {brinquedo, incluirBrinquedo, excluirBrinquedo} = props;
        const [qtdSelecionada, setQtdSelecionada] = useState(0);
        const [qtdDisponivel, setQtdDisponivel] = useState(brinquedo.quantidade);
        const [selecionado, setSelecionado] = useState(false);
    
        function handleSelecaoDesteBrinquedo(){
            setSelecionado(true);
            let qtdSelecionadaProv = qtdSelecionada;
            let brinquedoJaInserido = false;
            if(qtdDisponivel > 0){
                setQtdDisponivel(qtdDisponivel-1);
                setQtdSelecionada(qtdSelecionada+1);                
                qtdSelecionadaProv++;
            
                listaDeBrinquedosEscolhidos?.forEach(brinquedoNoArray => {
                    if(brinquedoNoArray.id_brinquedo === brinquedo.id_brinquedo){                        
                        console.log(qtdSelecionadaProv);
                        brinquedoNoArray.quantidade = qtdSelecionadaProv;
                        brinquedoJaInserido = true;
                        return;
                    }
                });
                brinquedo.quantidade = qtdSelecionadaProv;
                !brinquedoJaInserido && listaDeBrinquedosEscolhidos.push(brinquedo);
            }
            console.log(listaDeBrinquedosEscolhidos);
        }
    
        function handleSubtracaoBrinquedos(){
            let indiceASerRemovido = null;
            listaDeBrinquedosEscolhidos.forEach((brinquedoEscolhido, indice) => {
                if(brinquedoEscolhido.id_brinquedo === brinquedo.id_brinquedo){
                    if(brinquedoEscolhido.quantidade <= 1){
                        indiceASerRemovido = indice;
                    }else{
                        brinquedoEscolhido.quantidade--;
                    }
                    setQtdDisponivel(qtdDisponivel+1);
                    setQtdSelecionada(qtdSelecionada-1);
                } 
            });
            if(indiceASerRemovido != null){
                setSelecionado(false);
                listaDeBrinquedosEscolhidos.splice(indiceASerRemovido, 1);
            }
        }
    
        return(
            <fieldset className={`posRelative field_set_modulo_evento borda_azul link_fake padding-4px espacoAntes ${selecionado? 'selecionado' : ''}`}>
                
                <center onClick={handleSelecaoDesteBrinquedo} >
                    <div>
                        <img alt='exemplo' className="icone_brinquedo"  src={enderecoImagem+brinquedo.foto_brinquedo} height="40px"  />
                    </div>  
                    <div className="textoEmBold">
                        {brinquedo.nome_brinquedo}
                    </div>
                    <div className="quantidadeDeBrinquedos">
                            Quantidade Disponível:&nbsp;
                            {qtdDisponivel}
                    </div>
                </center>
                <div onClick={handleSubtracaoBrinquedos} className={`qtdSelecionada ${qtdSelecionada > 0 ? 'exibir': 'naoExibir'}`}>
                    <center>
                        {qtdSelecionada}
                    </center>
                </div> 
                
            </fieldset>
        )
    }
    
    return(
        <div>
            <h4>Lista de brinquedos disponíveis para a data:</h4>
            <div id='brinquedosDisponiveis' className="divFlex divFlexSpaceAround">
                {props.listaDeBrinquedosVagos?.map((item) => {
                    return <CelulaBrinquedo key={item.id_brinquedo} brinquedo = {item}
                    incluirBrinquedo = {incluirBrinquedo} excluirBrinquedo = {excluirBrinquedo}/>;
                })}
            </div>
        </div>
        
    )
    
}

export default CampoSelecaoBrinquedos;