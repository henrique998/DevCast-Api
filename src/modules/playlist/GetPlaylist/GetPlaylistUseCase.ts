import { inject, injectable } from "tsyringe"
import { AppError } from "../../../errors/AppError"
import { UniquePlaylistMap } from "../../../mappers/UniquePlaylistMap"
import { IPlaylistsRepository } from "../../../repositories/playlists/IPlaylistsRepository"

interface IRequest {
    accountId: string
    slug: string
}

@injectable()
class GetPlaylistUseCase {
    constructor(
        @inject("PrismaPlaylistsRepository")
        private playlistsRepository: IPlaylistsRepository
    ) {}

    async execute({ accountId, slug }: IRequest): Promise<UniquePlaylistMap> {
        if (!slug) {
            throw new AppError("slug is required!")
        }

        const playlistExists = await this.playlistsRepository.findBySlugAndAccountId({
            accountId,
            slug
        })

        if (!playlistExists) {
            throw new AppError("Playlist not found!")
        }

        const playlist = UniquePlaylistMap.toDto(playlistExists)

        return playlist
    }
}

export { GetPlaylistUseCase }