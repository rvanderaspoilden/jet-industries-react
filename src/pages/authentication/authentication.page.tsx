import React from 'react';
import './authentication.page.scss';
import {LoginComponent, LoginForm} from "../../components/login/login.component";
import {RegisterComponent, RegisterForm} from "../../components/register/register.component";
import {AuthContext} from "../../contexts/auth.context";
import {User} from "../../models/user.model";
import {Navigate} from "react-router-dom";

type AuthenticationState = {
    displayedForm: 'register' | 'login',
    registerForm: RegisterForm,
    loginForm: LoginForm,
    isAuthenticated: boolean
};
type AuthenticationProps = {};

export class AuthenticationPage extends React.Component<AuthenticationProps, AuthenticationState> {
    static contextType = AuthContext;
    context!: React.ContextType<typeof AuthContext>;

    constructor(props: AuthenticationProps) {
        super(props);

        this.state = {
            displayedForm: 'login',
            registerForm: {
                nickname: '',
                password: '',
                confirmPassword: '',
                email: ''
            },
            loginForm: {
                email: '',
                password: ''
            },
            isAuthenticated: false
        };
    }

    private handleLoginSubmit(form: LoginForm): void {
        this.setState({
            loginForm: form
        });

        this.context.signIn(form, (user: User) => {
            console.log("AUTHENTICATED", user);
            this.setState({
                isAuthenticated: true
            });
        });
    }

    private handleRegisterSubmit(form: RegisterForm): void {
        this.setState({
            registerForm: form
        });

        this.context.signUp(form, (success: boolean) => {
            console.log("REGISTRATION SUCCESS");

            this.setState({
                displayedForm: "login"
            });
        });
    }

    private handleToggleForm() {
        this.setState((value) => {
            return {
                displayedForm: value.displayedForm === 'login' ? 'register' : 'login'
            };
        });
    }

    render() {
        if (this.state.isAuthenticated) {
            return (
                <Navigate to="/admin" replace={true}/>
            );
        }

        const form = this.state.displayedForm === "login" ?
            <LoginComponent form={this.state.loginForm}
                            onSubmit={(event) => this.handleLoginSubmit(event)}
                            onToggleForm={() => this.handleToggleForm()}/> :
            <RegisterComponent form={this.state.registerForm}
                               onSubmit={(event) => this.handleRegisterSubmit(event)}
                               onToggleForm={() => this.handleToggleForm()}/>;

        return (
            <>
                <div className="bg"></div>

                <div className="star-field">
                    <div className="layer"></div>
                    <div className="layer"></div>
                    <div className="layer"></div>
                </div>

                <div className="page-body">
                    {form}
                </div>
            </>
        );
    }
}
