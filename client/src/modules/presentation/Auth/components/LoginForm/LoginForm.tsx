import { useForm } from 'react-hook-form';
import Input from '../../../../../shared/components/atoms/Input/Input';
import Logo from '../../../../../shared/components/molecules/Logo/Logo';
import './LoginForm.css';
import FormBtn from '../../../../../shared/components/atoms/FormBtn/FormBtn';
import { Router } from '../../../../../shared/routes/Routes';
import useLoginUser from '../../hooks/useLoginUser';

export default function LoginForm() {
    const { loginUser, load } = useLoginUser();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handle = async (e: any) => {
        await loginUser(e.email, e.password);
    }

    return (
        <form onSubmit={handleSubmit(handle)} className='LoginForm container-1'>
            <Logo />
            <Input label='Correo' type='text' placeholder='Ej. user@mail.com'
                register={register('email', {
                    required: "Se requiere este campo",
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Ingresa un correo válido"
                    }
                })}
                error={errors.email}
            />
            <Input label='Contraseña' type='password'
                register={register('password', {
                    required: "Se requiere este campo"
                })}
                error={errors.password}
            />
            <p className='sub1'>¿No tienes una cuenta? <a href={Router.REGISTER}>Crea una cuenta aquí</a></p>
            <FormBtn text='Ingresar' type='submit' isLoad={load} />
        </form>
    );
}