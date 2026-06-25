import './Create.css';
import { IoClose } from "react-icons/io5";
import Input from '../../../../../shared/components/atoms/Input/Input';
import IconBtn from '../../../../../shared/components/atoms/IconBtn/IconBtn';
import FormBtn from '../../../../../shared/components/atoms/FormBtn/FormBtn';
import { useState } from 'react';

interface ICreate {
    onClose: () => void;
}

export default function Create(props: ICreate) {
    const [name, setName] = useState<string>();
    const [desc, setDesc] = useState<string>();
    const [error, setError] = useState<string | null>();

    const click = () => {
        if (!name || !desc) return setError("Faltan campos");
        setError(null);
    }

    return (
        <form className='Create container-1'>
            <IconBtn customClass='close-btn' icon={<IoClose />} onClick={props.onClose} />
            <Input error={error && { message: error }} type='text' label='Nombre' onChange={(e) => setName(e.target.value)} />
            <div className='description-area'>
                <p className='Label'>Descripción</p>
                <textarea
                    className='area'
                    onChange={(e) => setDesc(e.target.value)}
                    style={{ height: "200px", borderColor: error ? "#ff4040" : "" }}
                />
                {error && <p className='Label' style={{ color: "#ff4040" }}>{error}</p>}
            </div>
            <FormBtn text='Crear' type='button' onClick={click} />
        </form>
    );
}