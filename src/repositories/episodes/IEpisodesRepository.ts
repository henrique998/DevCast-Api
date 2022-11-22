import { EpisodeDataDTO } from "../../dtos/episode/EpisodeDataDTO"
import { ICreateEpisodeDTO } from "../../dtos/episode/ICreateEpisodeDTO"

interface IEpisodesRepository {
    create(data: ICreateEpisodeDTO): Promise<void>
    findAll(): Promise<EpisodeDataDTO[]>
    findBySlug(slug: string): Promise<EpisodeDataDTO>
}

export { IEpisodesRepository }