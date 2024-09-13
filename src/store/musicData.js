import { musics } from "../data/musics";

export const useMusicsDataStore = () => ( {
    musicsData: [ ...musics ],
} );
