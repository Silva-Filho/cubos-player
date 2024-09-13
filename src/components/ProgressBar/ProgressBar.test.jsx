import React from "react";

import {
    describe,
    expect,
    it,
    render,
    screen,
    // userEvent,
    // vi,
} from "../../test";

import { ProgressBar } from ".";

describe.skip( "component ProgressBar - layout", () => {
    it( "should display ProgressBar elements", () => {
        render( <ProgressBar /> );

        const strongElementCurrentTime = screen.getByTestId( /current-time/i );
        const inputProgressBar = screen.getByTestId( /progress-line/i );
        const strongElementDuration = screen.getByTestId( /duration/i );

        expect( strongElementCurrentTime ).toBeInTheDocument();
        expect( inputProgressBar ).toBeInTheDocument();
        expect( strongElementDuration ).toBeInTheDocument();
    } );
} );
