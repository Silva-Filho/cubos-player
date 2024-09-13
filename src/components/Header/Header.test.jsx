import React from "react";

import {
    describe,
    expect,
    it,
    render,
    screen,
    userEvent,
    // vi,
} from "../../test";

import { Header } from ".";

describe.skip( "component Header - layout", () => {
    it( "should display Logo image", () => {
        render( <Header /> );

        const logoImg = screen.getByRole( "img", { name: /logo/i } );

        expect( logoImg ).toBeInTheDocument();
    } );

    it( "should display Profile image", () => {
        render( <Header /> );

        const profileImg = screen.getByRole( "img", { name: /profile/i } );

        expect( profileImg ).toBeInTheDocument();
    } );

    it( "should display Welcome message", () => {
        render( <Header /> );

        const welcomeMessage = screen.getByLabelText( /Welcome/i );

        expect( welcomeMessage ).toBeInTheDocument();
    } );

    it.todo( "should change cursor when mouse on Profile image", async () => {
        render( <Header /> );

        const profileImg = screen.getByRole( "img", { name: /profile/i } );
        const user = userEvent.setup();

        await user.hover( profileImg );

        expect( profileImg ).toBeInTheDocument();
    } );
} );
