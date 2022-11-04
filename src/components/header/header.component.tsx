import React from "react";
import './header.component.scss';
import {SlAvatar} from "@shoelace-style/shoelace/dist/react";

type HeaderProps = {
    title: string,
    isConnected?: boolean
};

export const HeaderComponent = (props: HeaderProps) => {
    let profile;

    if (props.isConnected) {
        profile = (
            <div className="profile">
                <SlAvatar initials="RV" label="User avatar"/>
            </div>
        );
    }

    return (
        <div className="container">
            <h1>{props.title}</h1>

            {profile}
        </div>
    );
}
