var Definicoes = {
    enderecoAPI: 'http://localhost:9000',
    servidorDeImagens: "http://localhost:9000/imagem/",
    enderecoInserirCliente: '/novoCliente',
    erroFormatacaoDeBuscaDeData: 'Insira uma data válida para busca',
    headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }),
    headersArquivo: new Headers({
        'Content-Type' : 'multipart/form-data; boudary',
        'Accept': 'multipart/form-data; boudary'
    })
}

export default Definicoes;