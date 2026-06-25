import './Create.css';
import { IoClose } from "react-icons/io5";
import Input from '../../../../../shared/components/atoms/Input/Input';
import IconBtn from '../../../../../shared/components/atoms/IconBtn/IconBtn';
import FormBtn from '../../../../../shared/components/atoms/FormBtn/FormBtn';
import { useState } from 'react';
import useProjectsHome from '../../hooks/useProjectsHome';

interface ICreate {
    onClose: () => void;
    onUpdate: () => void;
}

export default function Create(props: ICreate) {
    const { createProject } = useProjectsHome();
    const [name, setName] = useState<string>();
    const [desc, setDesc] = useState<string>();
    const [error, setError] = useState<string | null>();

    const click = async () => {
        if (!name) return setError("Faltan campos");
        setError(null);

        const d = desc || "";
        await createProject(name, d, props.onUpdate, props.onClose);
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
                    style={{ minHeight: "200px" }}
                />
            </div>
            <FormBtn text='Crear' type='button' onClick={click} />
        </form>
    );
}