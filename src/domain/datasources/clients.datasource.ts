import { ClientDto } from '../dtos/client.dto'
import { ClientEntity } from '../entities/client.entity'

export abstract class ClientsDatasource {
  abstract createClient (client: ClientDto): Promise<void>
  abstract getClients (): Promise<ClientEntity[]>
  abstract getClientById (id: string): Promise<ClientEntity | null>
  abstract updateClient (client: ClientDto): Promise<void>
  abstract deleteClient (id: string): Promise<void>
}
