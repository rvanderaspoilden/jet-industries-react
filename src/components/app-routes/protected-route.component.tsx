import {Navigate, RouteProps} from "react-router-dom";
import React from "react";
import {useAuth} from "../../contexts/auth.context";

type ProtectedRouteProps = RouteProps & {
    redirectPath?: string
}

const ProtectedRoute = ({redirectPath, children}: ProtectedRouteProps): JSX.Element => {
    const auth = useAuth();

    console.log("CHECK AUTHENT", auth.user);

    if (!auth.user) {
        return <Navigate to={redirectPath || '/authentication'} replace/>;
    }

    return children as JSX.Element;
}

export default ProtectedRoute;