import React, {useState} from "react";
import './header.component.scss';
import {SlAvatar, SlDivider, SlIcon, SlMenu, SlMenuItem, SlMenuLabel} from "@shoelace-style/shoelace/dist/react";
import {useAuth} from "../../contexts/auth.context";
import {useNavigate} from "react-router-dom";
import {notify} from "../../services/toastr.service";
import UserService from "../../services/user.service";

type HeaderProps = {
    title: string,
};

export const HeaderComponent = (props: HeaderProps) => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        const fullName = UserService.DisplayFullName(auth.user);

        auth.signOut(() => {
            notify(`Good bye ${fullName} !`, 'primary', 'broadcast-pin');
            navigate("/authentication");
        });
    }

    const profile = (
        <div className="profile">
            <SlAvatar initials={UserService.DisplayInitials(auth.user)} label="User avatar" onClick={() => setMenuOpen(!menuOpen)}/>

            <SlMenu className={`menu ${menuOpen ? "opened" : "closed"}`}>
                <SlMenuLabel>Name: {UserService.DisplayFullName(auth.user)}</SlMenuLabel>
                <SlMenuLabel>Role: {auth.user.role}</SlMenuLabel>
                <SlDivider/>
                <SlMenuItem value="logout" onClick={() => handleLogout()}>
                    <SlIcon slot="prefix" name="power"/>
                    Log out
                </SlMenuItem>
            </SlMenu>
        </div>
    );

    return (
        <div className="container">
            <h1>{props.title}</h1>

            {profile}
        </div>
    );
}
