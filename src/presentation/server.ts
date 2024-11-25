import express, { type Router } from 'express'

interface StartOptions {
  port: number
  router: Router
}

export class Server {
  private readonly app = express()
  private server: ReturnType<typeof this.app.listen> | null = null

  public async start (options: StartOptions): Promise<void> {
    this.setupMiddlewares()

    this.app.use(options.router)

    this.server = this.app.listen(options.port, () => {
      console.log(`Server is listening on port ${options.port}`)
    })
  }

  public async stop (): Promise<void> {
    if (this.server) {
      await new Promise<void>((resolve) => {
        this.server?.close(() => resolve())
      })
    }
  }

  private setupMiddlewares (): void {
    this.app.use(express.json())
  }
}
