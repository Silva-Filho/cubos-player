export const useControlsStore = ( set ) => ( {
    isPlaying: false,
    play: () => set( { isPlaying: true } ),
    pause: () => set( { isPlaying: false } ),
} );
