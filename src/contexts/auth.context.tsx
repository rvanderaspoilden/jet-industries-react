import React, {createContext, useState} from "react";
import {LoginForm} from "../components/login/login.component";
import {User} from "../models/user.model";
import authProviderMock from "../mock/auth/auth-provider.mock";
import {RegisterForm} from "../components/register/register.component";

export const AuthContext = createContext<AuthContextType>(undefined);

type AuthContextType = {
    user: User,
    signIn: (form: LoginForm, callback: (user: User) => void) => void,
    signUp: (form: RegisterForm, callback: (success: boolean) => void) => void,
    signOut: (callback: VoidFunction) => void,
}

type AuthContextProviderProps = {
    children: JSX.Element
}

export function useAuth() {
    return React.useContext(AuthContext);
}

export function AuthContextProvider(props: AuthContextProviderProps) {
    const [user, setUser] = useState(null);

    const signIn = (form: LoginForm, callback: (user: User) => void): void => {
        authProviderMock.signIn(form.email, form.password, (user: User) => {
            setUser(user);
            callback(user);
        });

        /*const requestOptions: RequestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(form)
        };

        // Call API to login
        fetch("http://localhost:8080/sign-in", requestOptions)
            .then(res => res.json())
            .then(res => console.log(res));*/
    };

    const signUp = (form: RegisterForm, callback: (success: boolean) => void): void => {
        authProviderMock.signUp((success: boolean) => {
            callback(success);
        });

        /*const requestOptions: RequestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(form)
        };

        // Call API to login
        fetch("http://localhost:8080/sign-up", requestOptions)
            .then(res => res.json())
            .then(res => console.log(res));*/
    };

    const signOut = (callback: VoidFunction): void => {
        authProviderMock.signOut(() => {
            setUser(null);
            callback();
        });
    };

    const value: AuthContextType = {user: user, signIn, signUp, signOut};

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
}
