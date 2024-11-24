import { ClientsRepository } from '../../domain/repositories/clients.repository'
import { ClientsDatasource } from '../../domain/datasources/clients.datasource'
import { ClientEntity } from '../../domain/entities/client.entity'
import { ClientDto } from '../../domain/dtos/client.dto'

export class ClientsRepositoryImpl implements ClientsRepository {
  constructor (private readonly clientsDatasource: ClientsDatasource) { }

  async createClient (client: ClientDto): Promise<void> {
    return await this.clientsDatasource.createClient(client)
  }

  async getClients (): Promise<ClientEntity[]> {
    return await this.clientsDatasource.getClients()
  }

  async getClientById (id: string): Promise<ClientEntity | undefined> {
    return await this.clientsDatasource.getClientById(id)
  }

  async getClientByEmail (email: string): Promise<ClientEntity | undefined> {
    return await this.clientsDatasource.getClientByEmail(email)
  }

  async updateClient (id: string, client: ClientDto): Promise<void> {
    return await this.clientsDatasource.updateClient(id, client)
  }

  async deleteClient (id: string): Promise<void> {
    return await this.clientsDatasource.deleteClient(id)
  }
}
