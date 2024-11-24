// TODO: Implement get clients sort by credits use case
import { ClientEntity } from '../../entities/client.entity'
import { ClientsRepository } from '../../repositories/clients.repository'

interface IGetClientsSortByCreditsUseCase {
  execute: () => Promise<ClientEntity[]>
}

export class GetClientsSortByCredits implements IGetClientsSortByCreditsUseCase {
  constructor (private readonly clientsRepository: ClientsRepository) { }

  async execute (): Promise<ClientEntity[]> {
    return await this.clientsRepository.getClientsSortByCredits()
  }
}
