interface AccountAuthTokenDataDTO {
    id: string
    refreshToken: string
    accountId: string
    expiresDate: Date
    createdAt: Date
}

export { AccountAuthTokenDataDTO }