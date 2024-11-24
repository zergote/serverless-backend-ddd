// TODO: Implement get client by id use case
import { ClientEntity } from '../../entities/client.entity'
import { ClientsRepository } from '../../repositories/clients.repository'

interface IGetClientByIdUseCase {
  execute: (id: string) => Promise<ClientEntity | undefined>
}

export class GetClientById implements IGetClientByIdUseCase {
  constructor (private readonly clientsRepository: ClientsRepository) { }

  async execute (id: string): Promise<ClientEntity | undefined> {
    return await this.clientsRepository.getClientById(id)
  }
}
