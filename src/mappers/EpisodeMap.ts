import { EpisodeDataDTO } from "../dtos/episode/EpisodeDataDTO";

class EpisodeMap {
    static toDto({ 
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