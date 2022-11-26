import { inject, injectable } from "tsyringe"
import { AppError } from "../../../errors/AppError"
import { IFavoritesEpisodesRepository } from "../../../repositories/favoritesEpisodes/IFavoritesEpisodesRepository"

interface IResponse {
    id: string
    accountId: string
}

@injectable()
class FindAllFavoritesEpisodesShortDataUseCase {
    constructor(
        @inject("PrismaFavoritesEpisodesRepository")
        private favoritesEpisodesRepository: IFavoritesEpisodesRepository
    ) {}

    async execute(accountId: string): Promise<IResponse[]> {
        if (!accountId) {
            throw new AppError("account id is required!")
        }

        const data = await this.favoritesEpisodesRepository.findAll(accountId)

        const favoritesEpisodes = data.map(favoriteEpisode => {
            return {
                id: favoriteEpisode.episode.id,
                accountId: favoriteEpisode.accountId
            }
        })

        return favoritesEpisodes
    }
}

export { FindAllFavoritesEpisodesShortDataUseCase }