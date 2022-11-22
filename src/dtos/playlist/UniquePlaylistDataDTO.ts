interface UniquePlaylistDataDTO {
    id: string
    name: string
    description: string
    coverImage: string
    slug: string
    accountId: string
    createdAt: Date
    episodes: {
        id: string
        thumbnail: string
        title: string
        members: string
        publishedAt: string
        duration: number
        slug: string
        likes: {
            id: string
            accountId: string
            episodeId: string
        }[]
    }[]
    _count: {
        episodes: number
    }
}

export { UniquePlaylistDataDTO }