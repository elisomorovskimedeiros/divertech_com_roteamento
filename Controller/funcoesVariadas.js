export function verificarDataMaisAntiga(dataUm,dataDois){
    let umArray = dataUm.split('-');
    let doisArray = dataDois.split('-');
    for(let i=0; i<3; i++){
        if(umArray[i] > doisArray[i]){
            return {dataDe: dataDois, dataAte: dataUm};
        }
    }
    return {dataDe: dataUm, dataAte: dataDois};
}

export function transformarDataDBParaDataPortugues(data){
    data = data.split('-');
    return String(data[2]) +'/'+ String(data[1]++) +'/'+ String(data[0]);
}

export function transformarDataPortuguesParaDataIngles(data){
    if(data.includes('/')){
        data = data.split('/');
        data.forEach(pos => {
            if(pos.length < 2){
                pos = '0'+pos;
            }
        });
        return String(data[2]) +'-'+ String(data[1]) +'-'+ String(data[0]);
    }
    return data;
}

export function contem(palavra, caractere){
    for(let i = 0; i <= palavra.length; i++){
        if(palavra[i] === caractere){
            return i;
        }
    }
    return false;
}

export function passarPrimeiraLetraParaMaiuscula(nome){
    if(nome.length > 2){
        if(nome[0].charCodeAt()>96){
            nome = nome[0].toUpperCase() + nome.substring(1, nome.length + 1); 
        }            
    }
    return nome;
}

export function validaCampo(campo){
    if(campo.value === ''){//invalidar campo
        campo.classList.add('campoInvalidado');
        campo.nextSibling.classList.add('naoExibir');
        campo.previousSibling.classList.remove('naoExibir');
        return false;
    }else{//validar campo
        campo.classList.remove('campoInvalidado');
        campo.nextSibling.classList.remove('naoExibir');
        campo.previousSibling.classList.add('naoExibir');
        return true;
    }
}

export function retornaApenasNumeros(numero){
    let copiaNumero = '';
        if(numero.length){
            for(let i = 0; i < numero.length; i++){
                if(numero[i].charCodeAt() < 58 && numero[i].charCodeAt() > 47){
                    copiaNumero += numero[i];
                }
            }
        }else{
            copiaNumero = null;
        }
        return copiaNumero;
}

export function mascaraDinheiro(valor){
    valor = String(valor);
    if(valor.charAt(0) === '0'){
        valor = valor.substr(1, valor.length+1);
    }
    return 'R$'+ valor;
}

export function mascaraCPF(cpf){
    cpf = retornaApenasNumeros(cpf);
    let pedacos = [];
    if(cpf.length === 11){
        pedacos[0] = cpf.substring(0,3);
        pedacos[1] = cpf.substring(3, 6);
        pedacos[2] = cpf.substring(6, 9);
        pedacos[3] = cpf.substring(9, 11);
        cpf = '';
    
        for(let i = 0;  i < pedacos.length; i++){
            if(i === pedacos.length - 1){
                cpf += '-';
            }else if(i !== 0){
                cpf += '.';
            }
            cpf += pedacos[i];
        }
    }
    return cpf;
}

export function mascaraCNPJ(cnpj){
    cnpj = retornaApenasNumeros(cnpj);
    let pedacos = [];
    if(cnpj.length === 14){
        pedacos[0] = cnpj.substring(0, 2);
        pedacos[1] = cnpj.substring(2, 5);
        pedacos[2] = cnpj.substring(5, 8);
        pedacos[3] = cnpj.substring(8, 12);
        pedacos[4] = cnpj.substring(12, 14);
        cnpj = '';
    
        for(let i = 0;  i < pedacos.length; i++){
            if(i === pedacos.length - 1){
                cnpj += '-';
            }else if(i === pedacos.length - 2){
                cnpj += '/';
            }else if(i !== 0){
                cnpj += '.';
            }
            cnpj += pedacos[i];
        }
    }
    return cnpj;
}

export function mascaraTelefoneCelular(telefone){
    if(telefone.length > 10){
        telefone = telefone.substring(telefone.length - 11, telefone.length);
        let pedacos = [];
        pedacos[0] = telefone.substring(0,2);
        pedacos[1] = telefone[2];
        pedacos[2] = telefone.substring(3,7);
        pedacos[3] = telefone.substring(7);
        telefone = '';
        for(let i = 0; i < pedacos.length; i++){  
               
            switch(i){
                case 0: telefone += '(' + pedacos[i] + ')';
                break;
                case 1: telefone += pedacos[i] + '.';
                break;
                case 2: telefone += pedacos[i] + '.';
                break;
                default: telefone += pedacos[i];               
            }      
        }
    }
    return telefone;
}

export function mascaraTelefoneFixo(telefone){
    if(telefone.length > 9){
        telefone = telefone.substring(telefone.length - 10, telefone.length);
        let pedacos = [];
        pedacos[0] = telefone.substring(0,2);
        pedacos[1] = telefone.substring(2,6);
        pedacos[2] = telefone.substring(6);
        telefone = '';
        for(let i = 0; i < pedacos.length; i++){  
               
            switch(i){
                case 0: telefone += '(' + pedacos[i] + ')';
                break;
                case 1: telefone += pedacos[i] + '.';
                break;
                default: telefone += pedacos[i];               
            }      
        }
    }
    return telefone;
}