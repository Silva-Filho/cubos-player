import React from "react";

import {
    act,
    afterEach,
    beforeEach,
    cleanup,
    describe,
    expect,
    it,
    // logRoles, 
    render,
    renderHook,
    screen,
    userEvent,
    // vi,
    // waitFor,
    within,
} from "../../test";

import { Home } from ".";
import { useMusicStore } from "../../store";
import { musics } from "../../data/musics";
import { useMusic } from "../../hooks/useMusic";

describe.skip( "component Home - layout", () => {
    it( "should display music's card", () => {
        render( <Home /> );

        const [
            music01,
            music02,
            music03,
            music04,
        ] = screen.getAllByLabelText( /music card/i );

        expect( music01 ).toHaveTextContent( /Acústico/i );
        expect( music02 ).toHaveTextContent( /Things/i );
        expect( music03 ).toHaveTextContent( /Other/i );
        expect( music04 ).toHaveTextContent( /simple/i );

        const imgMusic01 = within( music01 ).getByRole( "img", { name: /Acústico/i } );
        const imgMusic02 = within( music02 ).getByRole( "img", { name: /Things/i } );
        const imgMusic03 = within( music03 ).getByRole( "img", { name: /Other/i } );
        const imgMusic04 = within( music04 ).getByRole( "img", { name: /simple/i } );

        expect( music01 ).toContainElement( imgMusic01 );
        expect( music02 ).toContainElement( imgMusic02 );
        expect( music03 ).toContainElement( imgMusic03 );
        expect( music04 ).toContainElement( imgMusic04 );
    } );

    it( "should not display TAG audio", () => {
        render( <Home /> );

        const audioTag = screen.queryByLabelText( /audio/i );

        expect( audioTag ).not.toBeInTheDocument();
        expect( audioTag ).toBeNull();
    } );
} );

describe( "component Home - user behavior", () => {
    const initialStoreState = useMusicStore.getState();
    const user = userEvent.setup();

    let results;

    beforeEach( () => {
        useMusicStore.setState( initialStoreState, true );

        // const { result } = renderHook( () => useMusicStore() );
        const { result } = renderHook( () => {
            const {
                animationRef,
                audioRef,
                currentMusic,
                isPlaying,
                musicCurrentTime,
                progressInputRef,
                setAnimationRef,
                setMusicCurrentTime
            } = useMusicStore();
            const { changePlayerCurrentTime, whilePlaying } = useMusic();

            return {
                animationRef,
                audioRef,
                changePlayerCurrentTime,
                currentMusic,
                isPlaying,
                musicCurrentTime,
                progressInputRef,
                setAnimationRef,
                setMusicCurrentTime,
                whilePlaying,
            };
        } );

        results = result;

        render( <Home /> );
    } );

    afterEach( () => {
        cleanup(); // Resets the DOM after each test suite
    } );

    it( "should", async () => {
        const music02 = screen.getByLabelText( /card 02/i );
        await user.click( music02 );

        expect( results.current.audioRef.current ).toHaveAttribute(
            "src",
            musics[ 1 ].url
        );
        expect( results.current.audioRef.current ).toContainHTML(
            `<audio
                aria-label="audio"
                src=${ musics[ 1 ].url }
                preload="metadata"
            />`
        );

        expect( results.current.currentMusic ).not.toBeUndefined();
        expect( results.current.currentMusic ).toEqual( musics[ 1 ] );

        const music02Title = screen.getByTestId( /playing-title/i );
        expect( music02Title ).toHaveTextContent( /Just/i );

        const music02Artist = screen.getByTestId( /playing-artist/i );
        expect( music02Artist ).toHaveTextContent( /Cris/i );

        const playPauseButton = screen.getByRole( "button", { name: /play/i } );
        await user.click( playPauseButton );

        expect( results.current.isPlaying ).toBeTruthy();

        const playPauseImage = within( playPauseButton )
            .getByRole(
                "img",
                {
                    name: /pause/i
                }
            );
        expect( playPauseImage ).toHaveAttribute(
            "src",
            expect.stringMatching( /pause/i )
        );

        act( () => {
            // results.current.whilePlaying();
            // results.current.changePlayerCurrentTime();
            results.current.setMusicCurrentTime( 5 );
            results.current.setAnimationRef( 6 );

            results.current.progressInputRef.current.value = 5;
            results.current.audioRef.current.currentTime = 5;
            // results.current.audioRef.current.duration = 18000;

            // requestAnimationFrame( results.current.whilePlaying );

            /* setInterval( () => {
                results.current.changePlayerCurrentTime();
            }, 1000 ); */
        } );
        expect( results.current.musicCurrentTime ).toBeGreaterThan( 0 );
        expect( results.current.animationRef.current ).toBeGreaterThan( 0 );

        const currentTime = screen.getByTestId( /current-time/i );
        /* await waitFor( () => {
            expect( currentTime ).not.toHaveTextContent( /00:00/i );
            expect( currentTime ).toHaveTextContent( /00:05/i );
        } ); */
        expect( currentTime ).not.toHaveTextContent( /00:00/i );
        expect( currentTime ).toHaveTextContent( /00:05/i );

        const musicDuration = screen.getByTestId( /duration/i );
        // expect( musicDuration ).not.toHaveTextContent( /00:00/i );
        // expect( musicDuration ).toHaveTextContent( /03:00/i );

        /* const tagAudio = screen.getByLabelText( /audio/i );
        console.log( { tagAudio_seeking: tagAudio.seeking } );
        console.log( { tagAudio_seeked: tagAudio.seeked } );
        console.log( { tagAudio_duration: tagAudio.duration } ); */
        // screen.debug();
        const inputProgressBar = screen.getByRole( "slider" );
        // @ts-ignore
        expect( Number( inputProgressBar.value ) ).toBeGreaterThanOrEqual( 5 );
        // console.log( { inputProgressBar: inputProgressBar } );
        // console.log( { inputProgressBar_value: inputProgressBar.value } );
        // console.log( { results_current: results.current } );
        // console.log( { results_current_audioRef: results.current.audioRef } );
        console.log( { results_current_audioRef_current: results.current.audioRef.current } );
        // console.log( { results_current_audioRef_current_currentTime: results.current.audioRef.current.currentTime } );
        // console.log( { results_current_audioRef_current_playing: results.current.audioRef.current?.playing } );
        // console.log( { results_current_audioRef_current_progress: results.current.audioRef.current?.progress } );
        // console.log( { results_current_audioRef_current_duration: results.current.audioRef.current?.duration } );
        // console.log( { results_current_progressInputRef_current: results.current.progressInputRef.current } );
        // console.log( { results_current_progressInputRef_current_value: results.current.progressInputRef.current.value } );
        // console.log( { results_current_animationRef_current: results.current.animationRef.current } );
        // console.log( { results_current_animationRef: results.current.animationRef } );
    } );
} );
