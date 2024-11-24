import { envs } from './config/envs'
import { getRoutes } from './presentation/routes'
import { Server } from './presentation/server';

(async (): Promise<void> => {
  await main()
})().catch(console.error)

async function main (): Promise<void> {
  const server = new Server()

  await server.start({
    port: envs.PORT,
    router: getRoutes()
  })
}
