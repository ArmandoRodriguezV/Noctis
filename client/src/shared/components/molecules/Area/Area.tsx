import { useNotification } from '../../../context/NotificationCtx';
import Notification from '../../atoms/Notification/Notification';
import './Area.css';

export default function Area() {
    const { notifications } = useNotification();
    return (
        <div className='Area'>
            {
                notifications.map(n => (
                    <Notification message={n.message} status={n.status} />
                ))
            }
        </div>
    );
}