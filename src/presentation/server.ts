import express, { type Router } from 'express';

interface StartOptions {
  port: number;
  router: Router;
}

export class Server {
  private app = express();

  public async start(options: StartOptions) {
    this.setupMiddlewares();

    this.app.use(options.router);

    this.app.listen(options.port, () => {
      console.log(`Server is listening on port ${options.port}`);
    });
  }

  private setupMiddlewares() {
    this.app.use(express.json());
  }
}