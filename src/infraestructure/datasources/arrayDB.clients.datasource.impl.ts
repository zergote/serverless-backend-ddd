import { ClientDto, ClientEntity } from '../../domain'
import { ClientsDatasource } from '../../domain/datasources/clients.datasource'
import clients from '../../mock/clients.mock'
import { idGeneratorPlugin } from '../../plugins/id-generator.plugin'

// Emulate a database
const dbClientsMock = [...clients]

export class ArrayDBClientsDatasourceImpl implements ClientsDatasource {
  async createClient (client: ClientDto): Promise<void> {
    const id = idGeneratorPlugin()
    const createdAt = new Date()
    dbClientsMock.push({ id, ...client, createdAt })
  }

  async getClients (): Promise<ClientEntity[]> {
    return dbClientsMock.map(client => new ClientEntity(client))
  }

  async getClientById (id: string): Promise<ClientEntity | undefined> {
    const client = dbClientsMock.find(client => client.id === id)
    if (client == null) return undefined
    return new ClientEntity(client)
  }

  async getClientByEmail (email: string): Promise<ClientEntity | undefined> {
    const client = dbClientsMock.find(client => client.email === email)
    if (client == null) return undefined
    return new ClientEntity(client)
  }

  async updateClient (id: string, client: ClientDto): Promise<void> {
    const clientIndex = dbClientsMock.findIndex(clientSearch => clientSearch.id === id)
    if (clientIndex === -1) return
    const existingClient = dbClientsMock[clientIndex]
    dbClientsMock[clientIndex] = { ...client, id, createdAt: existingClient.createdAt }
  }

  async deleteClient (id: string): Promise<void> {
    const clientIndex = dbClientsMock.findIndex(clientSearch => clientSearch.id === id)
    if (clientIndex === -1) return
    dbClientsMock.splice(clientIndex, 1)
  }
}
