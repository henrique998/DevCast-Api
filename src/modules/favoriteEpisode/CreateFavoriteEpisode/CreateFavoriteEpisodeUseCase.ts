import { inject, injectable } from "tsyringe"
import { FavoriteEpisodeSerialiazedDataDTO } from "../../../dtos/favoriteEpisode/FavoriteEpisodeSerialiazedDataDTO"
import { AppError } from "../../../errors/AppError"
import { IFavoritesEpisodesRepository } from "../../../repositories/favoritesEpisodes/IFavoritesEpisodesRepository"

interface IRequest {
    episodeId: string
    accountId: string
}

@injectable()
class CreateFavoriteEpisodeUseCase {
    constructor(
        @inject("PrismaFavoritesEpisodesRepository")
        private favoritesEpisodesRepository: IFavoritesEpisodesRepository
    ) {}

    async execute({ episodeId, accountId }: IRequest): Promise<FavoriteEpisodeSerialiazedDataDTO> {
        if (!episodeId) {
            throw new AppError("episode id is required!")
        }

        if (!accountId) {
            throw new AppError("account id is required!")
        }

        const favoriteEpisodeExists = await this.favoritesEpisodesRepository.findByEpisodIdAndAccountId({
            episodeId,
            accountId
        })

        if (favoriteEpisodeExists) {
            return;
        }

        const episode = await this.favoritesEpisodesRepository.create({
            episodeId,
            accountId
        })

        return episode
    }
}

export { CreateFavoriteEpisodeUseCase }