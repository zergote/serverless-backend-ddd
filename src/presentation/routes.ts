import { Router } from 'express'
import { ClientsController } from './clients/controller'
import { ClientsRepositoryImpl } from '../infraestructure/repositories/clients.repository.impl'
import { ArrayDBClientsDatasourceImpl } from '../infraestructure/datasources/arrayDB.clients.datasource.impl'

export const getRoutes = (): Router => {
  const router = Router()
  const clientsDatasource = new ArrayDBClientsDatasourceImpl()
  const clientsRepository = new ClientsRepositoryImpl(clientsDatasource)
  const clientsController = new ClientsController(clientsRepository)
  router.post('/clients', clientsController.CreateClient)
  return router
}
