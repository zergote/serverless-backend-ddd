// TODO: Implement get client by email use case
import { ClientEntity } from '../../entities/client.entity'
import { ClientsRepository } from '../../repositories/clients.repository'

interface IGetClientByEmailUseCase {
  execute: (email: string) => Promise<ClientEntity | undefined>
}

export class GetClientByEmail implements IGetClientByEmailUseCase {
  constructor (private readonly clientsRepository: ClientsRepository) { }

  async execute (email: string): Promise<ClientEntity | undefined> {
    return await this.clientsRepository.getClientByEmail(email)
  }
}
