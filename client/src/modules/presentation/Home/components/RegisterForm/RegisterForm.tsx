import './RegisterForm.css';
import { useForm } from 'react-hook-form';
import { IoClose } from "react-icons/io5";
import Input from '../../../../../shared/components/atoms/Input/Input';
import FormBtn from '../../../../../shared/components/atoms/FormBtn/FormBtn';
import Logo from '../../../../../shared/components/molecules/Logo/Logo';
import IconBtn from '../../../../../shared/components/atoms/IconBtn/IconBtn';
import useCreateUser from '../../hooks/useCreateUser';

interface IRegisterForm {
    onClose: () => void;
}

export default function RegisterForm(props: IRegisterForm) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { createNewUser, load } = useCreateUser();

    const handle = async (e: any) => {
        const dto = {
            username: e.username,
            email: e.correo,
            password: e.pass
        }

        const res = await createNewUser(dto);
        if (res?.status === 200) {
            props.onClose();
        }
    }

    const password = watch("pass");

    return (
        <form onSubmit={handleSubmit(handle)} className='RegisterForm container-1'>
            <IconBtn icon={<IoClose />} customClass='closed' onClick={props.onClose} />
            <Logo />
            <Input
                type='text' label='Nombre de usuario'
                register={register('username',
                    {
                        required: "Se requiere este campo",
                    })}
                error={errors.username}
            />
            <Input
                type='text' label='Correo'
                placeholder='Ej. User@mail.com'
                register={register('correo',
                    {
                        required: "Se requiere este campo",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Ingresa un correo válido"
                        }
                    })}
                error={errors.correo}
            />
            <p>Crea y confirma tu contraseña</p>
            <Input type='password' label='Crea una contraseña segura'
                register={register("pass", {
                    required: "Se necesita este campo",
                    minLength: {
                        value: 8,
                        message: "Mínimo 8 caracteres"
                    },
                    pattern: {
                        value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/,
                        message:
                            "Debe contener mayúscula, minúscula, número y carácter especial"
                    }
                })}
                error={errors.pass}
            />
            <Input type='password' label='Confirma tu contraseña'
                register={register('conf', {
                    required: "Se necesita este campo",
                    validate: (value) =>
                        value === password || "Las contraseñas no coinciden"
                })}
                error={errors.conf}
            />
            <FormBtn text='Crear' isLoad={load}/>
        </form>
    );
}