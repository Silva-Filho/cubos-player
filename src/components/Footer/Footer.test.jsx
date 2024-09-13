import React from "react";

import {
    // beforeEach, 
    describe,
    expect,
    it,
    render,
    screen,
    // userEvent,
    // vi,
} from "../../test";

import { Footer } from "./index";

describe.skip( "component Footer - layout", () => {
    it( "should display music-infos H2 and SPAN without content", () => {
        render( <Footer /> );

        const h2Element = screen.getByTestId( /playing-title/i );
        const strongElement = screen.getByTestId( /playing-artist/i );

        expect( h2Element ).toBeEmptyDOMElement();
        expect( strongElement ).toBeEmptyDOMElement();
    } );
} );
