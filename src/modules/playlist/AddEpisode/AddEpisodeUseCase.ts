import { inject, injectable } from "tsyringe"
import { AppError } from "../../../errors/AppError"
import { IPlaylistsRepository } from "../../../repositories/playlists/IPlaylistsRepository"

interface IRequest {
    playlistId: string
    episodeId: string
    accountId: string
}

interface IResponse {
    id: string
    coverImage: string
    name: string
}

@injectable()
class AddEpisodeUseCase {
    constructor(
        @inject("PrismaPlaylistsRepository")
        private playlistsRepository: IPlaylistsRepository
    ) {}

    async execute({ episodeId, playlistId, accountId }: IRequest): Promise<IResponse> {
        if (!episodeId) {
            throw new AppError("episode id is required!")
        }

        if (!playlistId) {
            throw new AppError("playlist id is required!")
        }

        const playlistExists = await this.playlistsRepository.findById(playlistId)

        if (!playlistExists) {
            throw new AppError("playlist not found!")
        }

        if (playlistExists && playlistExists.accountId !== accountId) {
            throw new AppError("Unauthorized action!")
        }

        const data = await this.playlistsRepository.addToPlaylist({
            episodeId,
            playlistId
        })

        const playlist = {
            id: data.id,
            coverImage: data.coverImage,
            name: data.name
        }

        return playlist
    }
}

export { AddEpisodeUseCase }