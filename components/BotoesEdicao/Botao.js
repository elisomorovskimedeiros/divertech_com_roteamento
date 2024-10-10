
function Botao(props){
    
    return(
        <div onClick={props.onClick} key={props.nome} className='opcaoTelaEdicao'>
            <div className='imagemOpcao'>
                <img src={props.imagem} alt={props.nome} width={70}/>
            </div>
            <div className='nomeOpcao'>
                {props.nome}
            </div>
        </div>
    );
}

export default Botao;