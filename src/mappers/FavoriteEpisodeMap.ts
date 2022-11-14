import { FavoriteEpisodeSerialiazedDataDTO } from "../dtos/favoriteEpisode/FavoriteEpisodeSerialiazedDataDTO";

class FavoriteEpisodeMap {
    static toDto({ episode }: FavoriteEpisodeSerialiazedDataDTO) {
        return {
            id: episode.id,
            thumbnail: episode.thumbnail,
            title: episode.title,
            duration: episode.duration,
            members: episode.members,
            publishedAt: episode.publishedAt,
            slug: episode.slug
        }
    }
}

export { FavoriteEpisodeMap }