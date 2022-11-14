import React from 'react';
import './authentication.page.scss';
import {LoginComponent, LoginForm} from "../../components/login/login.component";
import {RegisterComponent, RegisterForm} from "../../components/register/register.component";
import {AuthContext} from "../../contexts/auth.context";
import {User} from "../../models/user.model";
import {Location, Navigate, useLocation} from "react-router-dom";
import {notify} from "../../services/toastr.service";

type AuthenticationState = {
    displayedForm: 'register' | 'login',
    registerForm: RegisterForm,
    loginForm: LoginForm,
};
type AuthenticationProps = {
    location: Location
};

export const AuthenticationPage = (props: any) => {
    const location = useLocation();
    return <Main location={location} {...props} />
}

class Main extends React.Component<AuthenticationProps, AuthenticationState> {
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
        };
    }

    private handleLoginSubmit(form: LoginForm): void {
        this.setState({
            loginForm: form
        });

        this.context.signIn(form, (user: User) => {
            notify(`Welcome ${user.firstName} ${user.lastName} !`, 'primary', 'broadcast-pin');
        }, (error: string) => {
            notify(error, 'danger', 'exclamation-octagon');
        });
    }

    private handleRegisterSubmit(form: RegisterForm): void {
        this.setState({
            registerForm: form
        });

        this.context.signUp(form, () => {
            notify("Registration success !", 'success');

            this.setState({
                displayedForm: "login"
            });
        }, (error: string) => {
            notify(error, 'danger', 'exclamation-octagon');
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
        const from = this.props.location.state?.from?.pathname || '/admin';

        if (this.context.user) {
            return (
                <Navigate to={from} replace={true}/>
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
