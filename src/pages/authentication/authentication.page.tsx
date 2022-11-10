import React, {FormEvent} from 'react';
import './authentication.page.scss';
import {LoginComponent} from "../../components/login/login.component";
import {RegisterComponent, RegisterForm} from "../../components/register/register.component";

type AuthenticationState = {
    displayedForm: 'register' | 'login',
    registerForm: RegisterForm
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
            }
        };
    }

    private handleLoginSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
    }

    private handleRegisterSubmit(form: RegisterForm): void {
        console.log(form);
        this.setState({
            registerForm: form
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
        const form = this.state.displayedForm === "login" ?
            <LoginComponent onSubmit={(event) => this.handleLoginSubmit(event)}
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
