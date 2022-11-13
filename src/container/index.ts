import { container } from "tsyringe"

import { IAccountsRepository } from "../repositories/accounts/IAccountsRepository"
import { PrismaAccountsRepository } from "../repositories/accounts/implementations/PrismaAccountsRepository"

import { IAccountAuthTokensRepository } from "../repositories/accountAuthTokens/IAccountAuthTokensRepository"
import { PrismaAccountAuthTokensRepository } from "../repositories/accountAuthTokens/implementations/PrismaAccountAuthTokensRepository"

container.registerSingleton<IAccountsRepository>(
    "PrismaAccountsRepository",
    PrismaAccountsRepository
)


container.registerSingleton<IAccountAuthTokensRepository>(
    "PrismaAccountAuthTokensRepository",
    PrismaAccountAuthTokensRepository
)