import React, {FormEvent} from 'react';
import './login.component.scss';
import {SlButton, SlCard, SlInput} from "@shoelace-style/shoelace/dist/react";

type LoginComponentProps = {
    onSubmit: (event: FormEvent<HTMLFormElement>) => void,
    onToggleForm: () => void
};

export function LoginComponent(props: LoginComponentProps) {
    return (
        <SlCard className="login-card">
            <h1>Sign In</h1>

            <form onSubmit={(event) => props.onSubmit(event)}>
                <SlInput placeholder="Email" type="email" size="large"/>
                <SlInput placeholder="Password" type="password" passwordToggle size="large"/>
                <SlButton>Sign In</SlButton>
            </form>

            <SlButton variant="text" onClick={() => props.onToggleForm()}>Don't have an account ?</SlButton>
        </SlCard>
    );
}
