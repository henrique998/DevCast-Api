import { EpisodeDataDTO } from "../dtos/episode/EpisodeDataDTO";

class EpisodeMap {
    static toDto({ 
        id,
        thumbnail, 
        title, 
        description, 
        members, 
        publishedAt, 
        duration, 
        url,
        _count,
    }: EpisodeDataDTO) {
        return {
            id,
            thumbnail, 
            title, 
            description, 
            members, 
            publishedAt, 
            duration, 
            audioUrl: url,
            aplauses: _count.likes
        }
    }
}

export { EpisodeMap }