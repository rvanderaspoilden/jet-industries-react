import React, {lazy} from "react";

const AdminPage = lazy(() => import("../pages/admin/admin.page"));
const AuthenticationPage = lazy(() => import("../pages/authentication/authentication.page"));

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
