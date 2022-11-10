import React, {FormEvent, useState} from 'react';
import './login.component.scss';
import {SlButton, SlCard, SlInput} from "@shoelace-style/shoelace/dist/react";

type LoginComponentProps = {
    form: LoginForm,
    onSubmit: (form: LoginForm) => void,
    onToggleForm: () => void
};

export type LoginForm = {
    email: string,
    password: string
}

export function LoginComponent(props: LoginComponentProps) {
    const [form, setForm] = useState<LoginForm>(props.form);

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        props.onSubmit(form);
    }

    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    }

    return (
        <SlCard className="login-card">
            <h1>Sign In</h1>

            <form onSubmit={(event) => handleSubmit(event)}>
                <SlInput name="email" placeholder="Email" type="email" size="large"
                         onSlChange={(event: any) => handleValueChange(event)} required/>
                <SlInput name="password" placeholder="Password" type="password" passwordToggle
                         onSlChange={(event: any) => handleValueChange(event)} size="large" required/>
                <SlButton type="submit">Sign In</SlButton>
            </form>

            <SlButton variant="text" onClick={() => props.onToggleForm()}>Don't have an account ?</SlButton>
        </SlCard>
    );
}
