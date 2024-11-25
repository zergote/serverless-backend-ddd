import { Server } from '../../presentation/server'
import { getRoutes } from '../../presentation/routes'
describe('Server', () => {
  let server: Server;

  afterEach(async () => {
    // Cerrar el servidor después de cada prueba
    await server?.stop();
  });

  it('should start the server', async () => {
    server = new Server()
    await server.start({
      port: 0,
      router: getRoutes()
    })
    expect(server).toBeDefined()
  })
})
