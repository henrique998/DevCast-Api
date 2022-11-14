import { container } from "tsyringe"

import { IAccountsRepository } from "../repositories/accounts/IAccountsRepository"
import { PrismaAccountsRepository } from "../repositories/accounts/implementations/PrismaAccountsRepository"

import { IAccountAuthTokensRepository } from "../repositories/accountAuthTokens/IAccountAuthTokensRepository"
import { PrismaAccountAuthTokensRepository } from "../repositories/accountAuthTokens/implementations/PrismaAccountAuthTokensRepository"

import { INewsletterRepository } from "../repositories/newsletter/INewsletterRepository"
import { PrismaNewsletterRepository } from "../repositories/newsletter/implementations/PrismaNewsletterRepository"
import { IEpisodesRepository } from "../repositories/episodes/IEpisodesRepository"
import { PrismaEpisodesRepository } from "../repositories/episodes/implementations/PrismaEpisodesRepository"
import { ILikesRepository } from "../repositories/likes/ILikesRepository"
import { PrismaLikesRepository } from "../repositories/likes/implementations/PrismaLikesRepository"
import { IFavoritesEpisodesRepository } from "../repositories/favoritesEpisodes/IFavoritesEpisodesRepository"
import { PrismaFavoritesEpisodesRepository } from "../repositories/favoritesEpisodes/implementations/PrismaFavoritesEpisodesRepository"
import { IPlaylistsRepository } from "../repositories/playlists/IPlaylistsRepository"
import { PrismaPlaylistsRepository } from "../repositories/playlists/implementations/PrismaPlaylistsRepository"

container.registerSingleton<IAccountsRepository>(
    "PrismaAccountsRepository",
    PrismaAccountsRepository
)

container.registerSingleton<IAccountAuthTokensRepository>(
    "PrismaAccountAuthTokensRepository",
    PrismaAccountAuthTokensRepository
)

container.registerSingleton<INewsletterRepository>(
    "PrismaNewsletterRepository",
    PrismaNewsletterRepository
)

container.registerSingleton<IEpisodesRepository>(
    "PrismaEpisodesRepository",
    PrismaEpisodesRepository
)

container.registerSingleton<ILikesRepository>(
    "PrismaLikesRepository",
    PrismaLikesRepository
)

container.registerSingleton<IFavoritesEpisodesRepository>(
    "PrismaFavoritesEpisodesRepository",
    PrismaFavoritesEpisodesRepository
)

container.registerSingleton<IPlaylistsRepository>(
    "PrismaPlaylistsRepository",
    PrismaPlaylistsRepository
)