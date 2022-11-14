import { inject, injectable } from "tsyringe"
import { FavoriteEpisodeSerialiazedDataDTO } from "../../../dtos/favoriteEpisode/FavoriteEpisodeSerialiazedDataDTO"
import { AppError } from "../../../errors/AppError"
import { FavoriteEpisodeMap } from "../../../mappers/FavoriteEpisodeMap"
import { IFavoritesEpisodesRepository } from "../../../repositories/favoritesEpisodes/IFavoritesEpisodesRepository"

interface FavoriteEpisode {
    id: string
    thumbnail: string
    title: string
    duration: number
    members: string
    publishedAt: string
    slug: string
}

@injectable()
class FindAllFavoritesEpisodesUseCase {
    constructor(
        @inject("PrismaFavoritesEpisodesRepository")
        private favoritesEpisodesRepository: IFavoritesEpisodesRepository
    ) {}

    async execute(accountId: string): Promise<FavoriteEpisode[]> {
        if (!accountId) {
            throw new AppError("account id is required!")
        }

        const data = await this.favoritesEpisodesRepository.findAll(accountId)

        const favoritesEpisodes = data.map(favoriteEpisode => FavoriteEpisodeMap.toDto(favoriteEpisode))

        return favoritesEpisodes
    }
}

export { FindAllFavoritesEpisodesUseCase }