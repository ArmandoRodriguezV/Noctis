import './Logo.css';
import noctis from '../../../../assets/Noctis.svg';

export default function Logo() {
    return (
        <div className='Logo'>
            <img src={noctis} height='100px'/>
            <p className='name'>Noctis</p>
        </div>
    );
}