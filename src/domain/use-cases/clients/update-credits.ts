// TODO: Implement update credits use case
import { ClientsRepository } from '../../repositories/clients.repository'

interface IUpdateCreditsUseCase {
  execute: (id: string, credits: number) => Promise<void>
}

export class UpdateCredits implements IUpdateCreditsUseCase {
  constructor (private readonly clientsRepository: ClientsRepository) { }

  async execute (id: string, credits: number): Promise<void> {
    return await this.clientsRepository.updateCredits(id, credits)
  }
}
