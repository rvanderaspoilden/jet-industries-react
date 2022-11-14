import {Navigate, RouteProps, useLocation} from "react-router-dom";
import React from "react";
import {useAuth} from "../../contexts/auth.context";

type ProtectedRouteProps = RouteProps & {
    redirectPath?: string
}

const ProtectedRoute = ({redirectPath, children}: ProtectedRouteProps): JSX.Element => {
    const auth = useAuth();
    const location = useLocation();

    if (!auth.user) {
        return <Navigate to={redirectPath || '/authentication'} state={{from: location}} replace/>;
    }

    return children as JSX.Element;
}

export default ProtectedRoute;