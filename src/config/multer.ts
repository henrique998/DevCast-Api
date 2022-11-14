import multer from "multer"
import { resolve } from "path"
import { randomBytes } from "crypto"

class Upload {
    static run(folder: string) {
        return {
            storage: multer.diskStorage({
                destination: resolve(__dirname, "..", "..", folder),
                filename: (req, file, cb) => {
                    const fileHash = randomBytes(16).toString("hex")

                    const fileName = `${fileHash}-${file.originalname}`

                    return cb(null, fileName)
                }
            })
        }
    }
}

export { Upload }