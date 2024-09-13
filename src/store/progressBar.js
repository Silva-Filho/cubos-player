export const useProgressBarStore = ( set ) => ( {
    progressInputRef: {},
    animationRef: { 
        current: 0 
    },
    // animationRef: {},
    musicCurrentTime: 0,
    setProgressInputRef: element => set( { progressInputRef: element } ),
    setAnimationRef: element => set( {
        animationRef: {
            current: element
        }
    } ),
    /* setAnimationRef: element => set( {
        animationRef: element
    } ), */
    setMusicCurrentTime: actualMusicTime => set( {
        musicCurrentTime: actualMusicTime
    } ),
} );
