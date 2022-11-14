import { inject, injectable } from "tsyringe"
import { EpisodeDataDTO } from "../../../dtos/episode/EpisodeDataDTO"
import { AppError } from "../../../errors/AppError"
import { IEpisodesRepository } from "../../../repositories/episodes/IEpisodesRepository"

interface IRequest {
    thumbnail: string
    title: string
    members: string
    description: string
    slug: string
    url: string
    type: string
    duration: number
    publishedAt: string
}

@injectable()
class CreateEpisodeUseCase {
    constructor(
        @inject("PrismaEpisodesRepository")
        private episodesRepository: IEpisodesRepository
    ) {}

    async execute(data: IRequest): Promise<EpisodeDataDTO> {
        const episode = await this.episodesRepository.create(data)

        return episode
    }
}

export { CreateEpisodeUseCase }