import { type ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../storage/storage";
import { Router } from "./Routes";

interface IRedirect {
    child: ReactElement;
}

export default function Redirect(props: IRedirect) {
    const token = getToken();

    if (!token) {
        return <Navigate to={Router.LOGIN} replace />;
    }

    return props.child;
}