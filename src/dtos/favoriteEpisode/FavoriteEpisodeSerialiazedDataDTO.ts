interface FavoriteEpisodeSerialiazedDataDTO {
    episode: {
        id: string
        thumbnail: string
        title: string
        duration: number
        members: string
        publishedAt: string
        slug: string
        url?: string
    }
    accountId: string
}

export { FavoriteEpisodeSerialiazedDataDTO }