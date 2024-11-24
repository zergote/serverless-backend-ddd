// TODO: Implement get clients use case
import { ClientEntity } from '../../entities/client.entity'
import { ClientsRepository } from '../../repositories/clients.repository'

interface IGetClientsUseCase {
  execute: () => Promise<ClientEntity[]>
}

export class GetClients implements IGetClientsUseCase {
  constructor (private readonly clientsRepository: ClientsRepository) { }

  async execute (): Promise<ClientEntity[]> {
    return await this.clientsRepository.getClients()
  }
}
