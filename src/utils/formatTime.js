export function handleFormatTime( musicTime ) {
    if ( isNaN( musicTime ) ) {
        return "00:00";
    }
    const mins = Math.floor( musicTime / 60 );
    const secs = Math.floor( musicTime % 60 );

    const timeString = `${ String( mins ).padStart( 2, "0" ) }:${ String( secs ).padStart( 2, "0" ) }`;

    return timeString;
}
