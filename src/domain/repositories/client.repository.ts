import { ClientDto } from '../dtos/client.dto'
import { ClientEntity } from '../entities/client.entity'

export abstract class ClientRepository {
  abstract createClient (client: ClientDto): Promise<ClientEntity | undefined>
  abstract getClients (): Promise<ClientEntity[]>
  abstract getClientById (id: string): Promise<ClientEntity | undefined>
  abstract getClientByEmail (email: string): Promise<ClientEntity | undefined>
  abstract updateClient (client: ClientDto): Promise<void>
  abstract deleteClient (id: string): Promise<void>
}
