import Modal from "../../Modal";

function TelaQuestaoDaTrocaDeEndereco(props){
    function naoAtualizar(){
        props.controle();
    }

    function atualizarComEnderecoDoCliente(){
        props.setEventoParaTrocaDeEndereco({
            bairro_evento: props.cliente.bairro,
            cidade_evento: props.cliente.cidade,
            complemento_evento: props.cliente.complemento,
            logradouro_evento: props.cliente.logradouro,
            numero_evento: props.cliente.numero,
            observacao_endereco_evento: props.cliente.observacao_endereco
        });
        props.setAtualizarEnderecoEvento(true);
        props.controle();
    }

    function atualizarComUltimoEvento(){
        props.setEventoParaTrocaDeEndereco(props.ultimoEvento);
        props.setAtualizarEnderecoEvento(true);
        props.controle();
    }


    
    return(
        <Modal titulo={"Deseja atualizar o endereço do evento?"} controle={props.controle}>

            <div onClick={naoAtualizar} className='bordaBonita borda_vermelha espacoDepois troca_de_endereco'>
                <h2>Não atualizar</h2>
            </div>
            <hr />
            <div>
                <h2>Sim, desejo atualizar por</h2>
                {
                    (props.ultimoEvento.logradouro_evento !== props.ultimoEvento.logradouro_cliente) &&
                
                <div onClick={atualizarComEnderecoDoCliente} className='bordaBonita borda_verde troca_de_endereco'>
                    <h3>Residência do Cliente:</h3>
                    <p>{props.cliente.logradouro}, {props.cliente.numero}, {props.cliente.bairro}, {props.cliente.cidade}</p>
                </div>
                }
                {
                    props.ultimoEvento.logradouro_evento &&
                    <div onClick={atualizarComUltimoEvento} className='bordaBonita borda_azul troca_de_endereco'>
                        <h3>Endereço do último evento do cliente:</h3>
                        {<p>{props.ultimoEvento.logradouro_evento}, {props.ultimoEvento.numero_evento}, {props.ultimoEvento.bairro_evento} {props.ultimoEvento.cidade_evento}</p>}
                    </div>
                }
                
            </div>
        </Modal>
    );
}

export default TelaQuestaoDaTrocaDeEndereco;