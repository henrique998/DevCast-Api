import { inject, injectable } from "tsyringe"
import { EpisodeDataDTO } from "../../../dtos/episode/EpisodeDataDTO"
import { EpisodeCardMap } from "../../../mappers/EpisodeCardMap"
import { IEpisodesRepository } from "../../../repositories/episodes/IEpisodesRepository"

@injectable()
class FindAllEpisodesUseCase {
    constructor(
        @inject("PrismaEpisodesRepository")
        private episodesRepository: IEpisodesRepository
    ) {}

    async execute(): Promise<EpisodeCardMap[]> {
        const data = await this.episodesRepository.findAll()

        const episodes = data.map(episode => EpisodeCardMap.toDto(episode))

        return episodes
    }
}

export { FindAllEpisodesUseCase }