import React, {FormEvent, useState} from 'react';
import './register.component.scss';
import {SlButton, SlCard, SlInput} from "@shoelace-style/shoelace/dist/react";

type RegisterComponentProps = {
    form: RegisterForm,
    onSubmit: (form: RegisterForm) => void,
    onToggleForm: () => void
};

export type RegisterForm = {
    nickname: string,
    password: string,
    confirmPassword: string,
    email: string
};

export function RegisterComponent(props: RegisterComponentProps) {
    const [form, setForm] = useState<RegisterForm>(props.form);

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        props.onSubmit(form);
    }

    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });

        if (event.target.name === "confirmPassword") {
            event.target.setCustomValidity(form.password !== event.target.value ? "Passwords are not equals" : "");
        }
    }

    return (
        <SlCard className="register-card">
            <h1>register for an account</h1>

            <h3>If you want to join the JetIndustries, you have to create an account to onboard the crew.</h3>

            <form onSubmit={(event) => handleSubmit(event)}>
                <SlInput name="nickname" className="field" required value={form.nickname} placeholder="Nickname*"
                         size="large"
                         onSlChange={(event: any) => handleValueChange(event)}/>
                <SlInput name="password" className="field" required
                         helpText="At least 8 characters, 1 upper, 1 lower, 1 digit"
                         pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"
                         value={form.password} placeholder="Password*" type="password"
                         passwordToggle size="large" onSlChange={(event: any) => handleValueChange(event)}/>
                <SlInput name="confirmPassword" required className="field" value={form.confirmPassword}
                         placeholder="Confirm password*"
                         type="password" passwordToggle size="large"
                         onSlChange={(event: any) => handleValueChange(event)}/>
                <SlInput name="email" className="field" required clearable value={form.email} placeholder="Email*"
                         type="email"
                         size="large"
                         onSlChange={(event: any) => handleValueChange(event)}/>
                <SlButton type="submit">Register</SlButton>
            </form>

            <SlButton variant="text" onClick={() => props.onToggleForm()}>Already have an account ?</SlButton>
        </SlCard>
    );
}
