// TODO: Implement update client use case
import { ClientDto } from '../../dtos/client.dto'
import { ClientsRepository } from '../../repositories/clients.repository'

interface IUpdateClientUseCase {
  execute: (id: string, client: ClientDto) => Promise<void>
}

export class UpdateClient implements IUpdateClientUseCase {
  constructor (private readonly clientsRepository: ClientsRepository) { }

  async execute (id: string, client: ClientDto): Promise<void> {
    return await this.clientsRepository.updateClient(id, client)
  }
}
