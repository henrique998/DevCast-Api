import { NextFunction, Request, response, Response } from "express"
import { verify } from "jsonwebtoken"
import { authConfig } from "../config/auth"
import { AppError } from "../errors/AppError"

interface IPayload {
  sub: string
}

async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new AppError({ error: true, code: "token.missing" }, 401)
  }

  const [, token] = authHeader?.split(" ")

  try {
    const { sub } = verify(token, authConfig.TOKEN_SECRET_KEY) as IPayload

    req.account = {
      id: sub
    }

    next()
  } catch {
    throw new AppError({ error: true, code: "token.expired" }, 401)
  }
}

export { ensureAuthenticated }

