import { config } from "dotenv"

config()

// SERVER CONFIG
if (!process.env.PORT) throw new Error('PORT must be provided')
export const config_PORT = process.env.PORT

if (!process.env.MONGO_URI) throw new Error('MONGO_URI must be provided')
export const config_MONGO_URI = process.env.MONGO_URI