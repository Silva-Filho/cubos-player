import React from "react";

// @ts-ignore
import Logo from "../../assets/logo.svg";
// @ts-ignore
import Profile from "../../assets/profile.png";
import "./styles.scss";

export function Header() {
    return (
        <header>
            <img aria-label="Logo" src={ Logo } alt="logo" />

            <div className="welcome" >
                <img aria-label="Profile" src={ Profile } alt="foto fo perfil" />

                <span aria-label="Welcome" >
                    Bem-vindo, Silva!
                </span>
            </div>
        </header >
    );
}
