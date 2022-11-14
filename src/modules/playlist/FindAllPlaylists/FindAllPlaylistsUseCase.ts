import { inject, injectable } from "tsyringe"
import { PlaylistSerialiazedDataDTO } from "../../../dtos/playlist/PlaylistSerialiazedDataDTO"
import { AppError } from "../../../errors/AppError"
import { PlaylistCardMap } from "../../../mappers/PlaylistCardMap"
import { IPlaylistsRepository } from "../../../repositories/playlists/IPlaylistsRepository"

@injectable()
class FindAllPlaylistsUseCase {
    constructor(
        @inject("PrismaPlaylistsRepository")
        private playlistsRepository: IPlaylistsRepository
    ) {}

    async execute(accountId: string): Promise<PlaylistSerialiazedDataDTO[]> {
        if (!accountId) {
            throw new AppError("account id is required!")
        }

        const data = await this.playlistsRepository.findAllByAccountId(accountId)

        const playlists = data.map(playlist => PlaylistCardMap.toDto(playlist))

        return playlists
    }
}

export { FindAllPlaylistsUseCase }