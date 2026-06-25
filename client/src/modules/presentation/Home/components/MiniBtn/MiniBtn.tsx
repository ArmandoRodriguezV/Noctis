import type { ReactElement } from 'react';
import './MiniBtn.css';

interface IMiniBtn {
    icon: ReactElement;
    text: string;
    onClick: () => void;
    customClass?: string;
}

export default function MiniBtn(props: IMiniBtn) {
    return (
        <div className={`MiniBtn ${props.customClass}`} onClick={props.onClick}>
            <p >{props.icon}</p>
            <p className='sub1'>{props.text}</p>
        </div>
    );
}