export const useCurrentMusicStore = ( set ) => ( {
    audioRef: {},
    /* audioRef: {
        current: {
            src: "",
        },
    }, */
    currentMusic: null,
    chooseMusic: music => set( { currentMusic: music } ),
    chooseAudioRef: audio => set( { audioRef: audio } ),
    /* chooseAudioRef: audio => set(
        audio.current ?
            { audioRef: audio } :
            {
                audioRef: {
                    current: {
                        src: "",
                    },
                }
            }
    ), */
    /* chooseAudioRef: audio => set(
        audio.current ?
            { audioRef: audio } :
            {
                audioRef: {
                    current: {},
                }
            }
    ), */
} );

// Object.entries(testeObjeto).length
