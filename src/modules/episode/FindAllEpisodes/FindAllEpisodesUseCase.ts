import { inject, injectable } from "tsyringe"
import { EpisodeDataDTO } from "../../../dtos/episode/EpisodeDataDTO"
import { IEpisodesRepository } from "../../../repositories/episodes/IEpisodesRepository"

@injectable()
class FindAllEpisodesUseCase {
    constructor(
        @inject("PrismaEpisodesRepository")
        private episodesRepository: IEpisodesRepository
    ) {}

    async execute(): Promise<EpisodeDataDTO[]> {
        const episodes = await this.episodesRepository.findAll()

        return episodes
    }
}

export { FindAllEpisodesUseCase }