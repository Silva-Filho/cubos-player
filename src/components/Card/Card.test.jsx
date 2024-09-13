import React from "react";

import {
    describe,
    expect,
    it,
    render,
    screen,
    userEvent,
    vi,
} from "../../test";

import { Card } from "./index";

import { musics } from "../../data/musics";

describe.skip( "component Card - layout", () => {
    it( "should display de music cover", () => {
        render( <Card music={ musics[ 1 ] } /> );

        const cardImg = screen.getByRole( "img", { name: /just/i } );

        expect( cardImg ).toBeInTheDocument();
    } );

    it( "should display de music title", () => {
        render( <Card music={ musics[ 1 ] } /> );

        const cardH2 = screen.getByRole( "heading", { name: /just/i } );

        expect( cardH2 ).toBeInTheDocument();
    } );

    it( "should display de music description", () => {
        render( <Card music={ musics[ 1 ] } /> );

        const cardParagraph = screen.getByText( /is simply dummy/i );

        expect( cardParagraph ).toBeInTheDocument();
    } );
} );

describe.skip( "component Card - user behavior", () => { 
    it( "should be able to click at card 02", async () => {
        render( <Card music={ musics[ 1 ] } /> );

        const user = userEvent.setup();

        const spyCardClick = vi.spyOn( user, "click" );
        await user.click( screen.getByLabelText( /card 02/i ) );

        expect( spyCardClick ).toHaveBeenCalledOnce();
    } );
} );
