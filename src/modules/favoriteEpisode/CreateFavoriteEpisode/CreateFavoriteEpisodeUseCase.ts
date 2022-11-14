import { inject, injectable } from "tsyringe"
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

    async execute({ episodeId, accountId }: IRequest): Promise<void> {
        if (!episodeId) {
            throw new AppError("episode id is required!")
        }

        if (!accountId) {
            throw new AppError("account id is required!")
        }

        const favoriteEpisodeAlreadyExists = await this.favoritesEpisodesRepository.findByEpisodIdAndAccountId({
            episodeId,
            accountId
        })

        if (favoriteEpisodeAlreadyExists) {
            await this.favoritesEpisodesRepository.delete(favoriteEpisodeAlreadyExists.id)
            return;
        }

        await this.favoritesEpisodesRepository.create({
            episodeId,
            accountId
        })
    }
}

export { CreateFavoriteEpisodeUseCase }