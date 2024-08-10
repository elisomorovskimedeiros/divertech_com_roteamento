

import BarraSuperior from '../../components/BarraSuperior';
import ProvedorVariaveisGlobais from '../../contexts/variaveisGlobais';
import { ToastContainer} from 'react-toastify';

export default function Dashboard({children}){
    return(
        <ProvedorVariaveisGlobais>
            <BarraSuperior/>
            {   
                children? children : 'dashboard'
            }
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                className="toast-container"
            />
           
        </ProvedorVariaveisGlobais>
        
    
    )
}