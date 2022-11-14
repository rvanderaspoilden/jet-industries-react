import {AuthenticationPage} from "../pages/authentication/authentication.page";
import {AdminPage} from "../pages/admin/admin.page";
import React from "react";

export type routeConfig = {
    path: string,
    element: React.ReactNode,
    needAuthentication: boolean
}

const routes: routeConfig[] = [
    {
        path: '/authentication',
        element: <AuthenticationPage/>,
        needAuthentication: false
    },
    {
        path: '/admin',
        element: <AdminPage/>,
        needAuthentication: true
    },
    {
        path: '/*',
        element: <AuthenticationPage/>,
        needAuthentication: false
    }
];

export default routes;