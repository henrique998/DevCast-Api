import { IAddToPlaylistDTO } from "../../dtos/playlist/IAddToPlaylistDTO"
import { ICreatePlayListDTO } from "../../dtos/playlist/ICreatePlaylistDTO"
import { IFindPlayListDTO } from "../../dtos/playlist/IFindPlaylistDTO"
import { PlaylistDataDTO } from "../../dtos/playlist/PlaylistDataDTO"
import { UniquePlaylistDataDTO } from "../../dtos/playlist/UniquePlaylistDataDTO"

interface IPlaylistsRepository {
    create(data: ICreatePlayListDTO): Promise<PlaylistDataDTO>
    findAllByAccountId(accountId: string): Promise<PlaylistDataDTO[]>
    findBySlug(slug: string): Promise<UniquePlaylistDataDTO>
    findBySlugAndAccountId(data: IFindPlayListDTO): Promise<UniquePlaylistDataDTO>
    findById(playlistId: string): Promise<PlaylistDataDTO>
    addToPlaylist(data: IAddToPlaylistDTO): Promise<PlaylistDataDTO>
}

export { IPlaylistsRepository }