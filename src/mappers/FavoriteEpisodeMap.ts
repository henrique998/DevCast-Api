import { FavoriteEpisodeSerialiazedDataDTO } from "../dtos/favoriteEpisode/FavoriteEpisodeSerialiazedDataDTO";

class FavoriteEpisodeMap {
    static toDto({ episode, accountId }: FavoriteEpisodeSerialiazedDataDTO) {
        return {
            id: episode.id,
            thumbnail: episode.thumbnail,
            title: episode.title,
            duration: episode.duration,
            members: episode.members,
            url: episode.url,
            publishedAt: episode.publishedAt,
            slug: episode.slug,
            accountId
        }
    }
}

export { FavoriteEpisodeMap }