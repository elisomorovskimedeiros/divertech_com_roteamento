import {useState, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/auth';

import '../SignIn/signin.css';

import logo from '../../assets/logo.png';

export default function SignUp(){
    const [nome, setNome] =useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const {signUp, loadingAuth, user} = useContext(AuthContext);
    const navigate = useNavigate();

    function hadleSubmit(e){
        e.preventDefault();
        if( nome !== '' && email !== '' && senha !== ''){
            signUp(email, senha, nome);
        }
        if(user){
            setNome('')
            setEmail('');
            setSenha('');
            navigate('/dashboard', {replace: true});
        }
    }

    return(
        <div className="container-center">
            <div className="login">
                <div className="login-area">
                    <img src={logo} alt="Logo do sistema de chamados" />
                </div>

                <form onSubmit={hadleSubmit}>
                    <h1>
                        Cadastrar Nova Conta
                    </h1>
                    <input
                        type="text"
                        placeholder='seu nome'
                        value={nome}
                        onChange={ (e) => setNome(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder='email@email.com'
                        value={email}
                        onChange={ (e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder='***********'
                        value={senha}
                        onChange={ (e) => setSenha(e.target.value)}
                    />
                    <button type="submit">
                        {loadingAuth? 
                            'Cadastrando...':
                            'Cadastrar'}
                        
                    </button>             
                </form>
                <Link to='/'>
                    Voltar ao login
                </Link>
            </div>
        </div>
    );
}