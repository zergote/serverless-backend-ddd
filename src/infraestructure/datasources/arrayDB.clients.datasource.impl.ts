/**
 * Representa el datasource de clientes con operaciones de emulación de base de datos. Para agregar una base de datos real, se debe implementar aqui.
 * @interface
 */
import { ClientDto, ClientEntity } from '../../domain'
import { ClientsDatasource } from '../../domain/datasources/clients.datasource'
import clients from '../../mock/clients.mock'
import { idGeneratorPlugin } from '../../plugins/id-generator.plugin'

// Emulate a database
const dbClientsMock = [...clients]

export class ArrayDBClientsDatasourceImpl implements ClientsDatasource {
  async updateCredits (id: string, credits: number): Promise<void> {
    const clientIndex = dbClientsMock.findIndex(clientSearch => clientSearch.id === id)
    if (clientIndex === -1) return
    dbClientsMock[clientIndex].availableCredit = credits
  }

  async getClientsSortByCredits (): Promise<ClientEntity[]> {
    const clientsSorted = dbClientsMock.sort((a, b) => b.availableCredit - a.availableCredit).map(client => new ClientEntity(client))
    return clientsSorted
  }

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
