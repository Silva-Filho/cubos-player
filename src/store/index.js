import create from "zustand";

import { useCurrentMusicStore } from "./music";
import { useMusicsDataStore } from "./musicData";
import { useControlsStore } from "./controls";
import { useProgressBarStore } from "./progressBar";

export const useMusicStore = create( ( set ) => ( {
    ...useCurrentMusicStore( set ),
    ...useMusicsDataStore(),
    ...useControlsStore( set ),
    ...useProgressBarStore( set ),
} ) );
