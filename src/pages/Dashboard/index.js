import BarraSuperior from '../../components/BarraSuperior';
import ProvedorVariaveisGlobais from '../../contexts/variaveisGlobais';

export default function Dashboard({children}){

    return(
        <ProvedorVariaveisGlobais>
            <BarraSuperior/>
            {   
                children? children : 'dashboard'
            }
        </ProvedorVariaveisGlobais>
        
    
    )
}