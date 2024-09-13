import React from "react";

import { useMusicStore } from "../../store";

import { Controls } from "../Controls";
import { ProgressBar } from "../ProgressBar";

import "./styles.scss";

export function Footer() {
    const currentMusic = useMusicStore( state => state.currentMusic );

    return (
        <footer className="container-footer" >
            <div className="preview-music-info" >
                <h2 data-testid="music-playing-title">
                    { currentMusic ? currentMusic.title : "" }
                </h2>

                <strong data-testid="music-playing-artist">
                    { currentMusic ? currentMusic.artist : "" }
                </strong>
            </div>

            <div className="container-player" >
                <Controls />

                <ProgressBar />
            </div>
        </footer>
    );
}
