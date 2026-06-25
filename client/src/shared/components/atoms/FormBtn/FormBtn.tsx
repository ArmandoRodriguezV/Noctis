import './FormBtn.css';

interface IFormBtn {
    text: string;
    type?: "submit" | "button";
    onClick?: () => void;
    isLoad?: boolean;
}

export default function FormBtn(props: IFormBtn) {
    return (
        <button
            className="FormBtn"
            type={props.type}
            onClick={props.onClick}
            disabled={props.isLoad}
        >
            {props.isLoad
                ? <div className="loader"></div>
                : props.text}
        </button>
    );
}