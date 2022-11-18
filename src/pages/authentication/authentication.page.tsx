import React from 'react';
import './authentication.page.scss';
import {LoginComponent, LoginForm} from "../../components/login/login.component";
import {RegisterComponent, RegisterForm} from "../../components/register/register.component";
import {AuthContext} from "../../contexts/auth.context";
import {User} from "../../models/user.model";
import {Location, Navigate, useLocation} from "react-router-dom";
import UserService from "../../services/user.service";
import {LoaderContextType, useLoader} from "../../contexts/loader.context";
import {NotificationService} from "../../services/toastr.service";

type AuthenticationState = {
    displayedForm: 'register' | 'login',
    registerForm: RegisterForm,
    loginForm: LoginForm,
};
type AuthenticationProps = {
    location: Location,
    loader: LoaderContextType
};

const AuthenticationPage = (props: any) => {
    const location = useLocation();
    const loader = useLoader();
    return <Main location={location} loader={loader} {...props} />
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

        this.props.loader.show();

        this.context.signIn(form, (user: User) => {
            this.props.loader.hide();
            NotificationService.notify(`Welcome ${UserService.DisplayFullName(user)} !`, 'primary', 'broadcast-pin');
        }, (error: string) => {
            this.props.loader.hide();
            NotificationService.notify(error, 'danger', 'exclamation-octagon');
        });
    }

    private handleRegisterSubmit(form: RegisterForm): void {
        this.setState({
            registerForm: form
        });

        this.props.loader.show();

        this.context.signUp(form, () => {
            this.props.loader.hide();
            NotificationService.notify("Registration success !", 'success');
            this.setState({
                displayedForm: "login"
            });
        }, (error: string) => {
            this.props.loader.hide();
            NotificationService.notify(error, 'danger', 'exclamation-octagon');
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

export default AuthenticationPage;
