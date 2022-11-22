import { EpisodeDataDTO } from "../dtos/episode/EpisodeDataDTO";

class EpisodeCardMap {
   static toDto({
    id,
    thumbnail,
    title,
    members,
    publishedAt,
    duration,
    _count,
    slug,
    url,
    type
   }: EpisodeDataDTO) {
    return {
        id,
        thumbnail,
        title,
        members,
        publishedAt,
        duration,
        likes: _count.likes,
        slug,
        url,
        type
    }
   }
}

export { EpisodeCardMap }