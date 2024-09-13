import React, { useEffect, useRef } from "react";

import { useMusic } from "../../hooks/useMusic";
import { useMusicStore } from "../../store";

import { handleFormatTime } from "../../utils/formatTime";

import "./styles.scss";

export function ProgressBar() {
    const progressInputRef = useRef( null );

    const { changePlayerCurrentTime } = useMusic();

    const audioRef = useMusicStore( state => state.audioRef );
    console.log( { audioProgressBar: audioRef } );
    // console.log( { audioRef_current_duration: audioRef.current?.duration } );
    const currentMusic = useMusicStore( state => state.currentMusic );
    const musicCurrentTime = useMusicStore( state => state.musicCurrentTime );
    const setProgressInputRef = useMusicStore( state => state.setProgressInputRef );

    useEffect( () => {
        console.log( { audioRef_current_duration: audioRef.current?.duration } );
        setProgressInputRef( progressInputRef );
        // @ts-ignore
        const seconds = Math.floor( audioRef.current?.duration );
        // @ts-ignore
        progressInputRef.current.max = seconds;
        // @ts-ignore
    }, [ audioRef.current?.loadedmetadata, audioRef.current?.readyState, currentMusic ] );

    function handleChangeProgress() {
        // @ts-ignore
        audioRef.current.currentTime = progressInputRef.current.value;

        changePlayerCurrentTime();
    }

    return (
        <div className="progress-container" >
            <strong data-testid="music-current-time" >
                { handleFormatTime( musicCurrentTime ) }
            </strong>

            <input
                data-testid="music-progress-line"
                type="range"
                defaultValue="0"
                ref={ progressInputRef }
                onChange={ handleChangeProgress }
                disabled={ !currentMusic }
            />

            <strong data-testid="music-duration" >
                { handleFormatTime(
                    // @ts-ignore
                    audioRef.current?.duration ?? 0
                ) }
            </strong>
        </div>
    );
}
