import { Router } from 'express'
import { ClientsController } from './clients/controller'
import { ClientsRepositoryImpl } from '../infraestructure/repositories/clients.repository.impl'
import { ArrayDBClientsDatasourceImpl } from '../infraestructure/datasources/arrayDB.clients.datasource.impl'

export const getRoutes = (): Router => {
  const router = Router()
  const clientsDatasource = new ArrayDBClientsDatasourceImpl()
  const clientsRepository = new ClientsRepositoryImpl(clientsDatasource)
  const clientsController = new ClientsController(clientsRepository)
  router.get('/clients/sort', clientsController.GetClientsSortByCredits)
  router.get('/clients/email/:email', clientsController.GetClientByEmail)
  router.get('/clients/:id', clientsController.GetClientById)
  router.get('/clients', clientsController.GetClients)
  router.post('/clients', clientsController.CreateClient)
  router.put('/clients/:id', clientsController.UpdateClient)
  router.delete('/clients/:id', clientsController.DeleteClient)
  router.put('/clients/:id/credits', clientsController.UpdateCredits)
  return router
}
