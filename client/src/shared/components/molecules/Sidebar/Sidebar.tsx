import './Sidebar.css';
import { PiFolders, PiHouse, PiUser } from "react-icons/pi";
import logo from '../../../../assets/Noctis.svg';
import IconBtn from '../../atoms/IconBtn/IconBtn';
import { useLocation } from 'react-router-dom';
import { Router } from '../../../routes/Routes';

export default function Sidebar() {
    const location = useLocation();
    const current = location.pathname;
    return (
        <div className='Sidebar'>
            <div className='separator'></div>
            <img src={logo} width="35px" />
            <div className='separator'></div>
            <IconBtn 
                customClass={`bar-btn ${current.startsWith(Router.HOME) && "select"}`} 
                icon={<PiHouse />} 
                onClick={() => { }} />
            <IconBtn 
                customClass={`bar-btn ${current.startsWith(Router.PROJECT) && "select"}`} 
                icon={<PiFolders />} 
                onClick={() => { }} />
            <IconBtn 
                customClass={`bar-btn ${current.startsWith(Router.PROFILE) && "select"}`} 
                icon={<PiUser />} 
                onClick={() => { }} />
        </div>
    );
}