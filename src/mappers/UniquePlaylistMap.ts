import { UniquePlaylistDataDTO } from "../dtos/playlist/UniquePlaylistDataDTO";

class UniquePlaylistMap {
   static toDto({
    name,
    description,
    _count,
    episodes
   }: UniquePlaylistDataDTO) {
    return {
        name,
        description,
        episodesCount: _count.episodes,
        episodes
    }
   }
}

export { UniquePlaylistMap }