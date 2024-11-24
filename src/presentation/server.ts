import express, { type Router } from 'express'

interface StartOptions {
  port: number
  router: Router
}

export class Server {
  private readonly app = express()

  public async start (options: StartOptions): Promise<void> {
    this.setupMiddlewares()

    this.app.use(options.router)

    this.app.listen(options.port, () => {
      console.log(`Server is listening on port ${options.port}`)
    })
  }

  private setupMiddlewares (): void {
    this.app.use(express.json())
  }
}
