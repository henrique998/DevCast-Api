import { inject, injectable } from "tsyringe"
import { AppError } from "../../../errors/AppError"
import { IFavoritesEpisodesRepository } from "../../../repositories/favoritesEpisodes/IFavoritesEpisodesRepository"

interface IRequest {
    favoriteEpisodeId: string
    accountId: string
}

@injectable()
class RemoveFavoriteEpisodeUseCase {
    constructor(
        @inject("PrismaFavoritesEpisodesRepository")
        private favoritesEpisodesRepository: IFavoritesEpisodesRepository
    ) {}

    async execute({ favoriteEpisodeId, accountId }: IRequest): Promise<void> {
        if (!favoriteEpisodeId) {
            throw new AppError("favorite episode id is required!")
        }

        const favoriteEpisodeExists = await this.favoritesEpisodesRepository.findById(favoriteEpisodeId)

        if (!favoriteEpisodeExists) {
            throw new AppError("Episode not found!")
        }

        if (favoriteEpisodeExists && favoriteEpisodeExists.accountId !== accountId) {
            throw new AppError("Unauthorized action!")
        }

        await this.favoritesEpisodesRepository.delete(favoriteEpisodeId)
    }
}

export { RemoveFavoriteEpisodeUseCase }