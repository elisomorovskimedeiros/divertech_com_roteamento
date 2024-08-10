import { FaArrowDown,FaArrowUp, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
export default function containerSetasDeTroca(){
    const corDasSetas = '#8383DB';
    const tamanhoDasSetas = '40px';
    return(
        <div className='containerSetasDeTroca'>
            <div className=''>
                <FaArrowLeft size={tamanhoDasSetas} color={corDasSetas}/>
            </div>        
            <div className=''>
                <FaArrowRight  size={tamanhoDasSetas} color={corDasSetas}/>
            </div>    
        </div>
    )    
}