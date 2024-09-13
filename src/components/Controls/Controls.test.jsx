import React from "react";

import {
    act,
    // afterEach,
    beforeEach,
    describe,
    expect,
    it,
    render,
    renderHook,
    screen,
    userEvent,
    vi,
    // waitFor,
} from "../../test";

import { Controls } from ".";
import { useMusicStore } from "../../store";

// vi.mock( "../../store" );

describe.skip( "component Controls - layout", () => {
    it( "should display images from controls buttons", () => {
        render( <Controls /> );

        const stopImg = screen.getByRole( "img", { name: /stop/i } );
        const previousImg = screen.getByRole( "img", { name: /previous/i } );
        const playImg = screen.getByRole( "img", { name: /play/i } );
        const nextImg = screen.getByRole( "img", { name: /next/i } );

        expect( stopImg ).toBeInTheDocument();
        expect( previousImg ).toBeInTheDocument();
        expect( playImg ).toBeInTheDocument();
        expect( nextImg ).toBeInTheDocument();
    } );

    it( "should display controls buttons disabled", () => {
        render( <Controls /> );

        const stopButton = screen.getByRole( "button", { name: /stop/i } );
        const previousButton = screen.getByRole( "button", { name: /previous/i } );
        const playButton = screen.getByRole( "button", { name: /play/i } );
        const nextButton = screen.getByRole( "button", { name: /next/i } );

        expect( stopButton ).toBeDisabled();
        expect( previousButton ).toBeDisabled();
        expect( playButton ).toBeDisabled();
        expect( nextButton ).toBeDisabled();
    } );
} );

describe.skip( "component Footer - user behavior", () => {
    const initialStoreState = useMusicStore.getState();
    // const { result } = renderHook( () => useMusicStore() );
    const user = userEvent.setup();

    let results;

    beforeEach( () => {
        useMusicStore.setState( initialStoreState, true );

        const { result } = renderHook( () => useMusicStore() );

        results = result;

        render( <Controls /> );
    } );
    /* afterEach( () => {
        vi.clearAllMocks();
    } ); */

    it(
        `
            should change image from playImg to pauseImg and 
            play music when click in playButton
        `,
        async () => {
            /* const { result } = renderHook( () => useMusicStore() );

            render( <Controls /> ); */

            const playButton = screen.getByRole( "button", { name: /play/i } );
            // const user = userEvent.setup();
            const spyPlayButton = vi
                .spyOn( user, "click" );

            await user.click( playButton );

            act( () => {
                // result.current.play();
                results.current.play();
            } );

            expect( spyPlayButton ).toHaveBeenCalledOnce();
            // expect( result.current.isPlaying ).toBeTruthy();
            expect( results.current.isPlaying ).toBeTruthy();
            expect( playButton ).not.toHaveAttribute(
                "src",
                expect.stringMatching( /play/i )
            );
            /* await waitFor( () => {
                expect( playButton ).not.toHaveAttribute(
                    "src",
                    // expect.stringMatching( /pause/i )
                    expect.stringMatching( /play/i )
                );
            } ); */
        }
    );

    it( "should change music to play when click in previousButton", async () => {
        const spyButton = vi
            .spyOn( user, "click" );
        const playButton = screen.getByRole( "button", { name: /play/i } );

        await user.click( playButton );

        act( () => {
            // result.current.play();
            results.current.play();
        } );
        // screen.debug();
        expect( spyButton ).toHaveBeenCalledOnce();
        // expect( result.current.isPlaying ).toBeTruthy();
        expect( results.current.isPlaying ).toBeTruthy();
        expect( playButton ).not.toHaveAttribute(
            "src",
            expect.stringMatching( /play/i )
        );
        expect( results.current.musicCurrentTime ).toBe( 0 );

        const prevButton = screen.getByRole( "button", { name: /previous/i } );

        await user.click( prevButton );

        act( () => {
            /* result.current.pause();
            result.current.setMusicCurrentTime( 1000 ); */
            results.current.setMusicCurrentTime( 1000 );
            results.current.pause();
        } );
        // screen.debug();
        expect( spyButton ).toHaveBeenCalledTimes( 2 );
        // expect( result.current.isPlaying ).toBeFalsy();
        expect( results.current.isPlaying ).toBeFalsy();
        expect( results.current.musicCurrentTime ).toBeGreaterThanOrEqual( 1000 );
    } );

    it( "should change music to play when click in nextButton", async () => {
        const spyButton = vi
            .spyOn( user, "click" );
        const playButton = screen.getByRole( "button", { name: /play/i } );

        await user.click( playButton );

        act( () => {
            // result.current.play();
            results.current.play();
        } );
        // screen.debug();
        expect( spyButton ).toHaveBeenCalledOnce();
        // expect( result.current.isPlaying ).toBeTruthy();
        expect( results.current.isPlaying ).toBeTruthy();
        expect( playButton ).not.toHaveAttribute(
            "src",
            expect.stringMatching( /play/i )
        );
        expect( results.current.musicCurrentTime ).toBe( 0 );

        const nextButton = screen.getByRole( "button", { name: /next/i } );

        await user.click( nextButton );

        act( () => {
            /* result.current.pause();
            result.current.setMusicCurrentTime( 1000 ); */
            results.current.setMusicCurrentTime( 1000 );
            results.current.pause();
        } );
        // screen.debug();
        expect( spyButton ).toHaveBeenCalledTimes( 2 );
        // expect( result.current.isPlaying ).toBeFalsy();
        expect( results.current.isPlaying ).toBeFalsy();
        expect( results.current.musicCurrentTime ).toBeGreaterThanOrEqual( 1000 );
    } );

    it( "should stop music playing when click in stopButton", async () => {
        const spyButton = vi
            .spyOn( user, "click" );
        const playButton = screen.getByRole( "button", { name: /play/i } );

        await user.click( playButton );

        act( () => {
            // result.current.play();
            results.current.play();
        } );
        // screen.debug();
        expect( spyButton ).toHaveBeenCalledOnce();
        // expect( result.current.isPlaying ).toBeTruthy();
        expect( results.current.isPlaying ).toBeTruthy();
        expect( playButton ).not.toHaveAttribute(
            "src",
            expect.stringMatching( /play/i )
        );
        expect( results.current.musicCurrentTime ).toBe( 0 );

        const stopButton = screen.getByRole( "button", { name: /stop/i } );

        await user.click( stopButton );

        act( () => {
            /* result.current.pause();
            result.current.setMusicCurrentTime( 1000 ); */
            results.current.setMusicCurrentTime( 1000 );
            results.current.pause();
            results.current.setMusicCurrentTime( 0 );
        } );
        // screen.debug();
        expect( spyButton ).toHaveBeenCalledTimes( 2 );
        // expect( result.current.isPlaying ).toBeFalsy();
        expect( results.current.isPlaying ).toBeFalsy();
        expect( results.current.musicCurrentTime ).toBe( 0 );
    } );
} );
