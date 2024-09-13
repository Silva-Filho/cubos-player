import React, { useEffect, useRef } from "react";

import { useMusic } from "../../hooks/useMusic";
import { useMusicStore } from "../../store";

// @ts-ignore
import NextButton from "../../assets/next.svg";
// @ts-ignore
import PauseButton from "../../assets/pause.svg";
// @ts-ignore
import PlayButton from "../../assets/play.svg";
// @ts-ignore
import PreviousButton from "../../assets/previous.svg";
// @ts-ignore
import StopButton from "../../assets/stop.svg";
import "./styles.scss";

export function Controls() {
    const animationRef = useRef( null );

    const { handlePlayMusic, whilePlaying } = useMusic();

    const musicsData = useMusicStore( state => state.musicsData );
    const audioRef = useMusicStore( state => state.audioRef );
    const currentMusic = useMusicStore( state => state.currentMusic );
    const isPlaying = useMusicStore( state => state.isPlaying );
    const playMusic = useMusicStore( state => state.play );
    const pauseMusic = useMusicStore( state => state.pause );
    const animationRefStored = useMusicStore( state => state.animationRef );
    const setAnimationRefStored = useMusicStore( state => state.setAnimationRef );

    const musicsList = [ ...musicsData ];

    let posicaoAtual = currentMusic?.id;

    useEffect( () => {
        setAnimationRefStored( animationRef );
    }, [] );


    function handlePause() {
        // @ts-ignore
        audioRef.current.pause();

        pauseMusic();
        // @ts-ignore
        cancelAnimationFrame( animationRefStored.current );
    }

    function handlePlay() {
        audioRef.current.play();

        playMusic();
        // @ts-ignore
        animationRefStored.current = requestAnimationFrame( whilePlaying );
        // setAnimationRefStored( requestAnimationFrame( whilePlaying ) );
    }

    function handleStop() {
        // @ts-ignore
        audioRef.current.pause();
        // @ts-ignore
        audioRef.current.currentTime = 0;

        if ( isPlaying ) {
            pauseMusic();
        }
    }

    function handlePrevious() {
        posicaoAtual -= 1;

        if ( posicaoAtual < 1 ) {
            posicaoAtual = musicsList.length;
        }

        const tmpMusic = musicsList.find( item => {
            return item.id === posicaoAtual;
        } );

        handlePlayMusic( tmpMusic );
        handleStop();
    }

    function handleNext() {
        posicaoAtual += 1;

        if ( posicaoAtual > musicsData.length ) {
            posicaoAtual = 1;
        }

        const tmpMusic = musicsData.find( item => {
            return item.id === posicaoAtual;
        } );

        handlePlayMusic( tmpMusic );
        handleStop();
    }

    return (
        <div className="container-controls" >
            <button
                type="button"
                disabled={ !currentMusic }
                onClick={ () => handleStop() }
            >
                <img
                    src={ StopButton }
                    alt="stop button"
                />
            </button>

            <button
                type="button"
                disabled={ !currentMusic }
                onClick={ () => handlePrevious() }
            >
                <img
                    src={ PreviousButton }
                    alt="previous button"
                />
            </button>

            <button
                data-testid="play-pause-button"
                className="principal-button"
                type="button"
                disabled={ !currentMusic }
                onClick={ () => isPlaying ? handlePause() : handlePlay() }
            >
                { isPlaying ?
                    <img
                        src={ PauseButton }
                        alt="pause button"
                    /> :
                    <img
                        src={ PlayButton }
                        alt="play button"
                    />
                }
            </button>

            <button
                type="button"
                disabled={ !currentMusic }
                onClick={ () => handleNext() }
            >
                <img
                    src={ NextButton }
                    alt="next button"
                />
            </button>
        </div>
    );
}
