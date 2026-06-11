import './RegisterForm.css';
import { useForm } from 'react-hook-form';
import Input from '../../../../../shared/components/atoms/Input/Input';
import FormBtn from '../../../../../shared/components/atoms/FormBtn/FormBtn';
import Logo from '../../../../../shared/components/molecules/Logo/Logo';
import useCreateUser from '../../hooks/useCreateUser';
import { Router } from '../../../../../shared/routes/Routes';

export default function RegisterForm() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { createNewUser, load } = useCreateUser();

    const handle = async (e: any) => {
        const dto = {
            username: e.username,
            email: e.correo,
            password: e.pass
        }

        await createNewUser(dto);
    }

    const password = watch("pass");

    return (
        <form onSubmit={handleSubmit(handle)} className='RegisterForm container-1'>
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
            <p className='sub1'>¿Ya tienes una cuenta? <a href={Router.LOGIN}>Ingresa aquí</a></p>
            <FormBtn text='Crear' isLoad={load} />
        </form>
    );
}