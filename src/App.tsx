import React from 'react';
import './App.scss';
import {Route, Routes} from "react-router-dom";
import {AuthenticationPage} from "./pages/authentication/authentication.page";
import {AdminPage} from "./pages/admin/admin.page";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/authentication" element={<AuthenticationPage/>}/>
                <Route path="/admin" element={<AdminPage/>}/>
                <Route path="*" element={<AuthenticationPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
