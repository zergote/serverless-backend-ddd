/**
 * Representa el repositorio de clientes con operaciones CRUD básicas
 * y operaciones específicas del dominio.
 */
import { ClientDto } from '../dtos/client.dto'
import { ClientEntity } from '../entities/client.entity'

export abstract class ClientsRepository {
  abstract createClient (client: ClientDto): Promise<void>
  abstract getClients (): Promise<ClientEntity[]>
  abstract getClientById (id: string): Promise<ClientEntity | undefined>
  abstract getClientByEmail (email: string): Promise<ClientEntity | undefined>
  abstract updateClient (id: string, client: ClientDto): Promise<void>
  abstract deleteClient (id: string): Promise<void>
  abstract updateCredits (id: string, credits: number): Promise<void>
  abstract getClientsSortByCredits (): Promise<ClientEntity[]>
}
