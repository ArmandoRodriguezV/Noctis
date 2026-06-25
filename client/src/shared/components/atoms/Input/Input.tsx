import './Input.css';
import type { UseFormRegisterReturn } from "react-hook-form";
import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

interface IInput {
    type: "text" | "password";
    label?: string;
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    register?: UseFormRegisterReturn;
    error?: any;
    customClass?: string;
}

export default function Input(props: IInput) {
    const isPassword = props.type === "password";
    const [show, setShow] = useState(isPassword);
    const [intType, setType] = useState(props.type);
    
    const handle = () => {
        setShow(!show)
        setType(show ? "text" : "password")
    }

    const existError = props.error;

    return (
        <div className={`Input ${props.customClass}`}>
            {props.label && <p className='Label'>{props.label}</p>}
            <div className='content' style={{borderColor: existError && "#ff4940"}}>
                <input
                    { ...props.register }
                    style={{ width: !isPassword ? "100%" : "calc(100% - 50px)" }}
                    type={intType}
                    onChange={props.onChange}
                    placeholder={props.placeholder}
                />
                {
                    isPassword &&
                    <div className='show' onClick={handle}>
                        {show ? <FaRegEyeSlash /> : <FaRegEye />}
                    </div>
                }
            </div>
            { existError && <p className='errorMsg'>{props.error.message}</p> }
        </div>
    );
}