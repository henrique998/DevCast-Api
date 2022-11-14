import { inject, injectable } from "tsyringe"
import { EpisodeSerializedDataDTO } from "../../../dtos/episode/EpisodeSerializedDataDTO"
import { AppError } from "../../../errors/AppError"
import { EpisodeMap } from "../../../mappers/EpisodeMap"
import { IEpisodesRepository } from "../../../repositories/episodes/IEpisodesRepository"

@injectable()
class GetEpisodeUseCase {
    constructor(
        @inject("PrismaEpisodesRepository")
        private episodesRepository: IEpisodesRepository
    ) {}

    async execute(slug: string): Promise<EpisodeSerializedDataDTO> {
        if (!slug) {
            throw new AppError("slug is required!")
        }

        const data = await this.episodesRepository.findBySlug(slug)

        const episode = EpisodeMap.toDto(data)

        return episode
    }
}

export { GetEpisodeUseCase }