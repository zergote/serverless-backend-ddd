// TODO: Implement update client use case
import { ClientEntity } from '../../entities/client.entity'
import { ClientsRepository } from '../../repositories/clients.repository'

interface IUpdateClientUseCase {
  execute: (id: string, client: ClientEntity) => Promise<void>
}

export class UpdateClient implements IUpdateClientUseCase {
  constructor (private readonly clientsRepository: ClientsRepository) { }

  async execute (id: string, client: ClientEntity): Promise<void> {
    return await this.clientsRepository.updateClient(id, client)
  }
}
