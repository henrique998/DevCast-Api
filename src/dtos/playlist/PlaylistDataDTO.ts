interface PlaylistDataDTO {
    id: string
    name: string
    description: string
    coverImage: string
    slug: string
    accountId: string
    createdAt: Date
    _count: {
        episodes: number
    }
}

export { PlaylistDataDTO }