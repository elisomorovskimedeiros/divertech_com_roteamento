import { Routes, Route, BrowserRouter} from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Private from './private';
import ProvedorVariaveisGlobais from '../contexts/variaveisGlobais';
import TelaEventos from '../components/Eventos/telaEventos';
import TelaClientes from '../components/Clientes/TelaClientes';
import TelaBrinquedos from '../components/Brinquedos/TelaBrinquedos';
import HandleEventos from '../components/Eventos/HandleEventos';
import HandleClientes from '../components/Clientes/HandleClientes';
import NovoEvento from '../components/Eventos/NovoEvento';
import NovoCliente from '../components/Clientes/NovoCliente';
import UploadFile from '../components/Brinquedos/Teste';
import ConteudoDaTela from '../pages/ConteudoDaTela';

//Para jogar conteúdo iterável na tela de trabalho utilize a função setConteudoDaTela de '../contexts/variaveisGlobais'
function Rotas(){
    return(   
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ /*<SignIn />*/ <Dashboard><TelaEventos /></Dashboard>} />
                <Route path='/register' element={ <SignUp /> } />
                <Route path='/dashboard' element={ <Private><Dashboard><TelaEventos /></Dashboard></Private> } />
                <Route path='/eventos' element={ <Private><Dashboard><HandleEventos /><TelaEventos /></Dashboard></Private> } />
                <Route path='/clientes' element={ <Private><Dashboard><HandleClientes /><TelaClientes /></Dashboard></Private> } />
                <Route path='/clientes/new' element={ <Private><Dashboard><HandleClientes /><NovoCliente /></Dashboard></Private> } />
                <Route path='/clientes/find' element={ <Private><Dashboard><HandleClientes /><ConteudoDaTela><TelaClientes /></ConteudoDaTela></Dashboard></Private> } />
                <Route path='/brinquedos' element={ <Private><Dashboard><TelaBrinquedos /></Dashboard></Private> } /> 
                <Route path='/eventos/new' element={ <Private><Dashboard><HandleEventos /><NovoEvento /></Dashboard></Private> } />
                <Route path='/eventos/:id' element={ <Private><Dashboard><HandleEventos /><TelaEventos /></Dashboard></Private> } /> 

                <Route path='/teste' element={ <UploadFile />} />             
            </Routes>
        </BrowserRouter>     
            
    );
}

export default Rotas;