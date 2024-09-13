import React from "react";

import { useMusic } from "../../hooks/useMusic";

import "./styles.scss";

export function Card( { music } ) {
    const { handlePlayMusic } = useMusic();

    return (
        <div
            aria-label={ `music card 0${ music.id }` }
            data-testid={ `music card 0${ music.id }` }
            className="music-card"
            onClick={ () => handlePlayMusic( music ) }
        >
            <img src={ music.cover } alt={ music.title } />

            <h2>{ music.title }</h2>

            <p>{ music.description }</p>
        </div>
    );
}
