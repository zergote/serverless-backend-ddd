import express from 'express'
import serverless from 'serverless-http'
import { getRoutes } from './presentation/routes'

const app = express()

// Configuración middlewares y rutas
app.use(express.json())
app.use(getRoutes())

// Handler para AWS Lambda
export const handler = serverless(app) 