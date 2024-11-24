import { envs } from './config/envs';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';




(async () => {
  main();
})();



async function main() {

  const server = new Server();

  server.start({
    port: envs.PORT,
    router: AppRoutes.routes,
  });
}
