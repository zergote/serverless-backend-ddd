import express from 'express'
import serverless from 'serverless-http'
import { getRoutes } from './presentation/routes'

// Crear la aplicación Express
const app = express()

// Configurar middlewares
app.use(express.json())

// Configurar rutas
app.use(getRoutes())

// Exportar el handler para AWS Lambda
export const handler = serverless(app) 