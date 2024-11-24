// TODO: Implement delete client use case
import { ClientsRepository } from '../../repositories/clients.repository'

interface IDeleteClientUseCase {
  execute: (id: string) => Promise<void>
}

export class DeleteClient implements IDeleteClientUseCase {
  constructor (
    private readonly clientsRepository: ClientsRepository
  ) { }

  async execute (id: string): Promise<void> {
    // Verificar que el cliente existe
    const client = await this.clientsRepository.getClientById(id)
    if (client == null) throw new Error('Cliente no encontrado')

    // Eliminar el cliente
    await this.clientsRepository.deleteClient(id)
  }
}
