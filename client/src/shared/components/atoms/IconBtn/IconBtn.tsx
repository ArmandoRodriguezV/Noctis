import './IconBtn.css';
import type { ReactElement } from 'react';

interface IIconBtn {
    icon: ReactElement;
    onClick: () => void;
    customClass?: string;
}

export default function IconBtn(props: IIconBtn) {
    return (
        <div onClick={props.onClick} className={`${props.customClass} IconBtn`}>
            {props.icon}
        </div>
    );
}