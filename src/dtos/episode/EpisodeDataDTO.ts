interface EpisodeDataDTO {
    id: string
    thumbnail: string
    title: string
    members: string
    description: string
    slug: string
    url: string
    type: string
    duration: number
    playlistId?: string
    publishedAt: string
    _count: {
        likes: number
    }
}

export { EpisodeDataDTO }