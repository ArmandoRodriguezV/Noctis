import './Home.css';
import { BiPlusCircle } from 'react-icons/bi';
import IconBtn from '../../../../shared/components/atoms/IconBtn/IconBtn';
import Over from '../../../../shared/components/molecules/Over/Over';
import RegisterForm from '../components/RegisterForm/RegisterForm';
import { useState } from 'react';

export default function Home() {
    const [openRegisterForm, setOpenRegisterForm] = useState<boolean>(false);
    return (
        <div className='Home page'>
            {openRegisterForm && <Over content={<RegisterForm onClose={() => setOpenRegisterForm(false)} />} />}
            <IconBtn customClass='addUser' onClick={() => setOpenRegisterForm(true) } icon={<BiPlusCircle />} />
        </div>
    );
}