import { useMusicStore } from "../store";

export function useMusic() {
    const pauseMusic = useMusicStore( state => state.pause );
    const setCurrentMusic = useMusicStore( state => state.chooseMusic );
    const audioRef = useMusicStore( state => state.audioRef );
    const animationRef = useMusicStore( state => state.animationRef );
    // const setAnimationRefStored = useMusicStore( state => state.setAnimationRef );
    const setMusicCurrentTime = useMusicStore( state => state.setMusicCurrentTime );
    const progressInputRef = useMusicStore( state => state.progressInputRef );

    function handlePlayMusic( musicChoosed ) {
        // console.log( { musicChoosed } );
        // console.log( { audioRef } );
        // pauseMusic();
        // @ts-ignore
        if ( audioRef.current ) {
            audioRef.current.src = musicChoosed.url;
            
            pauseMusic();
        }
        // audioRef.current.src = musicChoosed.url;

        setCurrentMusic( musicChoosed );
    }

    function whilePlaying() {
        // @ts-ignore
        if ( progressInputRef.current ) {
            progressInputRef.current.value = audioRef.current?.currentTime;
        }

        changePlayerCurrentTime();
        // @ts-ignore
        animationRef.current = requestAnimationFrame( whilePlaying );
        // setAnimationRefStored( requestAnimationFrame( whilePlaying ) );

        // console.log( { animationRef_current: animationRef.current } );
        // console.log( { animationRef: animationRef } );
    }

    function changePlayerCurrentTime() {
        // @ts-ignore
        if ( progressInputRef.current ) {
            progressInputRef.current.style.setProperty(
                "--seek-before-width",
                // @ts-ignore
                `${ progressInputRef.current.value / audioRef.current.duration * 100 }%`
            );
        }
        // @ts-ignore
        setMusicCurrentTime( progressInputRef.current?.value );
        handleChangeButtonPlayPause();
    }

    function handleChangeButtonPlayPause() {
        // @ts-ignore
        if ( audioRef.current?.ended ) {
            pauseMusic();
        }
    }

    return {
        handlePlayMusic,
        whilePlaying,
        changePlayerCurrentTime,
    };
}
