import React from 'react';
import './authentication.page.scss';
import {LoginComponent, LoginForm} from "../../components/login/login.component";
import {RegisterComponent, RegisterForm} from "../../components/register/register.component";

type AuthenticationState = {
    displayedForm: 'register' | 'login',
    registerForm: RegisterForm,
    loginForm: LoginForm
};
type AuthenticationProps = {};

export class AuthenticationPage extends React.Component<AuthenticationProps, AuthenticationState> {

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
            }
        };
    }

    private handleLoginSubmit(form: LoginForm): void {
        this.setState({
            loginForm: form
        });

        console.log(form);

        // Call API to login
    }

    private handleRegisterSubmit(form: RegisterForm): void {
        this.setState({
            registerForm: form
        });

        console.log(form);

        // Call API to register
    }

    private handleToggleForm() {
        this.setState((value) => {
            return {
                displayedForm: value.displayedForm === 'login' ? 'register' : 'login'
            };
        });
    }

    render() {
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
