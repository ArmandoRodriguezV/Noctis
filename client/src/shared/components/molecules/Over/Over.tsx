import type { ReactElement } from 'react';
import './Over.css';

interface IOver {
    content: ReactElement;
}

export default function Over(props: IOver) {
    return (
        <div className='Over page'>
            {props.content}
        </div>
    );
}