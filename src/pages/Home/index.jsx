import React, { useEffect, useRef } from "react";

import { useMusicStore } from "../../store";

import { Header } from "../../components/Header";
import { Card } from "../../components/Card";
import { Footer } from "../../components/Footer";

import "./styles.scss";

export function Home() {
    const audioRef = useRef( null );
    // const audioRef = useRef( {} );
    // const audioRef = useRef( undefined );

    const musicsData = useMusicStore( state => state.musicsData );
    const currentMusic = useMusicStore( state => state.currentMusic );
    const chooseAudioRef = useMusicStore( state => state.chooseAudioRef );

    useEffect( () => {
        // console.log( { audioRef_Home: audioRef } );
        chooseAudioRef( audioRef );
        // chooseAudioRef( audioRef ?? {} );
    }, [ currentMusic ] );

    return (
        <div data-testid="container-home" className="container" >

            <Header />

            <main className="container-main" >
                <h1>The best play list</h1>

                <div className="line" ></div>

                <div className="container-cards" >
                    { musicsData?.map( music => (
                        <Card
                            key={ music.id }
                            music={ music }
                        />
                    ) ) }
                </div>
            </main>

            <Footer />

            { currentMusic &&
                <audio
                    aria-label="audio"
                    ref={ audioRef }
                    src={ currentMusic ?
                        // @ts-ignore
                        currentMusic.url :
                        "" }
                    preload="metadata"
                />
            }
        </div>
    );
}
