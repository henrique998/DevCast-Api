interface ICreateAccountAuthTokenDTO {
    refreshToken: string
    accountId: string
    expiresDate: Date
}

export { ICreateAccountAuthTokenDTO }