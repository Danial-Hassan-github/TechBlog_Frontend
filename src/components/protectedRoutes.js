import { useEffect } from 'react';
import {useNavigate, useNavigation} from 'react-router-dom'
const PrivateRoutes=(props)=>{
    const {Component}=props;
    const navigate=useNavigate();
    useEffect(()=>{
        let login=localStorage.getItem('login');
        if(!login){
            navigate('/login')
        }
    },[])
    return(
        <div>
            <Component/>
        </div>
    )
}
export default PrivateRoutes