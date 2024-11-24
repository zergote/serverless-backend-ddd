import { ClientDto } from '../../dtos/client.dto'
import { ClientsRepository } from '../../repositories/clients.repository'

interface ICreateClientUseCase {
  execute: (clientDto: ClientDto) => Promise<void>
}

export class CreateClientUseCase implements ICreateClientUseCase {
  constructor (private readonly clientRepository: ClientsRepository) { }

  async execute (clientDto: ClientDto): Promise<void> {
    const clientExists = await this.clientRepository.getClientByEmail(clientDto.email)

    if (clientExists === undefined) {
      throw new Error('Client already exists')
    }
    const client = await this.clientRepository.createClient(clientDto)
    return client
  }
}
