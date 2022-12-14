import "reflect-metadata"
import "express-async-errors"
import "dotenv/config"
import cors from "cors"
import express, { NextFunction, Request, Response } from "express"

import { resolve } from "path"

// import swaggerFile from "./swagger.json"
import "./container"
// import swaggerUi from "swagger-ui-express"
import { AppError } from "./errors/AppError"
import { routes } from "./routes"

const app = express()

app.use(express.json())

app.use("/images", express.static(resolve(__dirname, "..", "uploads")))
app.use(cors())
app.use(routes)
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message,
        })
    }

    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`,
    })
})

export { app }
