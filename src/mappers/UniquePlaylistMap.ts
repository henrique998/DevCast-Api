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
        episodes: episodes.map(episode => {
            return {
                ...episode,
                aplauses: episode.likes.length
            }
        })
    }
   }
}

export { UniquePlaylistMap }