import './Notification.css';
import type { ApiResponse } from '../../../routes/Response';
import { BiCheckCircle, BiError, BiErrorCircle } from 'react-icons/bi';

export default function Notification(props: ApiResponse<any>) {

    const icon = 
        props.status === 200 ? <BiCheckCircle /> :
        props.status === 500 ? <BiErrorCircle /> :
        <BiError />

    const style =
        props.status === 200 ? "suc" :
        props.status === 500 ? "err" : "war"

    return (
        <div className={`Notification ${style}`}>
            <p className='message'>{props.message}</p>
            <p className='icn'>
                {icon}
            </p>
        </div>
    );
}