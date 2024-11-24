import { ClientDto } from '../../dtos/client.dto'
import { ClientEntity } from '../../entities/client.entity'
import { ClientRepository } from '../../repositories/clients.repository'

interface ICreateClientUseCase {
  execute: (clientDto: ClientDto) => Promise<ClientEntity | undefined>
}

export class CreateClientUseCase implements ICreateClientUseCase {
  constructor (private readonly clientRepository: ClientRepository) { }

  async execute (clientDto: ClientDto): Promise<ClientEntity | undefined> {
    const clientExists = await this.clientRepository.getClientByEmail(clientDto.email)

    if (clientExists === undefined) {
      throw new Error('Client already exists')
    }
    const client = await this.clientRepository.createClient(clientDto)
    return client
  }
}
