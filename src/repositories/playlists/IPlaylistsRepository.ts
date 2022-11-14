import { ICreatePlayListDTO } from "../../dtos/playlist/ICreatePlaylistDTO"
import { PlaylistDataDTO } from "../../dtos/playlist/PlaylistDataDTO"

interface IPlaylistsRepository {
    create(data: ICreatePlayListDTO): Promise<PlaylistDataDTO>
}

export { IPlaylistsRepository }