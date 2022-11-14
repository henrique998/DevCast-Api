import { FavoriteEpisodeDataDTO } from "../../dtos/favoriteEpisode/FavoriteEpisodeDataDTO"
import { FavoriteEpisodeSerialiazedDataDTO } from "../../dtos/favoriteEpisode/FavoriteEpisodeSerialiazedDataDTO"
import { ICreateFavoriteEpisodeDTO } from "../../dtos/favoriteEpisode/ICreateFavoriteEpisodeDTO"
import { IFindFavoriteEpisodeDTO } from "../../dtos/favoriteEpisode/IFindFavoriteEpisodeDTO"

interface IFavoritesEpisodesRepository {
    create(data: ICreateFavoriteEpisodeDTO): Promise<void>
    delete(favoriteEpisodeId: string): Promise<void>
    findAll(accountId: string): Promise<FavoriteEpisodeSerialiazedDataDTO[]>
    findByEpisodIdAndAccountId(data: IFindFavoriteEpisodeDTO): Promise<FavoriteEpisodeDataDTO>
    findById(favoriteEpisodeId: string): Promise<FavoriteEpisodeDataDTO>
}

export { IFavoritesEpisodesRepository }