import React, {Suspense} from 'react';
import './App.scss';
import {Route, Routes} from "react-router-dom";
import RoutesConfig, {routeConfig} from "./configs/routes.config";
import ProtectedRoute from "./components/protected-route/protected-route.component";

function App() {
    const routes = RoutesConfig.map((route: routeConfig) => {
        const element = route.needAuthentication ? (
            <ProtectedRoute {...route}>
                {route.element}
            </ProtectedRoute>
        ) : (route.element);

        return (
            <Route key={route.path}
                   path={route.path}
                   element={element}/>
        );
    });

    return (
        <div className="App">
            <Suspense fallback={<h1>Page is loading...</h1>}>
                <Routes>
                    {routes}
                </Routes>
            </Suspense>
        </div>
    );
}

export default App;
