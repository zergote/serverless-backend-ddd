/**
 * Representa el datasource de clientes con operaciones de emulación de base de datos. Para agregar una base de datos real, se debe implementar aqui.
 */
import { ClientDto, ClientEntity } from '../../domain'
import { ClientsDatasource } from '../../domain/datasources/clients.datasource'
import { idGeneratorPlugin } from '../../plugins/id-generator.plugin'
import AWS from 'aws-sdk'


export class DynamoDBClientsDatasourceImpl implements ClientsDatasource {

  private dynamoDBClient: AWS.DynamoDB.DocumentClient

  constructor () {
    this.dynamoDBClient = new AWS.DynamoDB.DocumentClient()
  }

  async createClient (client: ClientDto): Promise<void> {
    const id = idGeneratorPlugin()
    const createdAt = new Date().toISOString()
    const clientToSave = new ClientEntity({ id, ...client, createdAt: new Date(createdAt) })
    await this.dynamoDBClient.put({
      TableName: 'ClientsTable',
      Item: {
        ...clientToSave,
        createdAt
      }
    }).promise()
  }


  async getClientsSortByCredits (): Promise<ClientEntity[]> {
    const clients = await this.dynamoDBClient.scan({
      TableName: 'ClientsTable'
    }).promise()
    const clientsSorted = clients.Items?.sort((a, b) => b.availableCredit - a.availableCredit).map(client => new ClientEntity({
      id: client.id as string,
      name: client.name as string,
      email: client.email as string,
      availableCredit: client.availableCredit as number,
      createdAt: new Date(client.createdAt as string)
    })) || []
    return clientsSorted
  }


  async getClients (): Promise<ClientEntity[]> {
    const clients = await this.dynamoDBClient.scan({
      TableName: 'ClientsTable'
    }).promise()

    return clients.Items?.map(client => new ClientEntity({
      id: client.id as string,
      name: client.name as string,
      email: client.email as string,
      availableCredit: client.availableCredit as number,
      createdAt: new Date(client.createdAt as string)
    })) || []
  }

  async updateClient (id: string, client: ClientDto): Promise<void> {
    // Obtener el cliente existente para mantener createdAt
    const existingClient = await this.dynamoDBClient.get({
      TableName: 'ClientsTable',
      Key: { id }
    }).promise()

    const clientToUpdate = new ClientEntity({
      id,
      ...client,
      createdAt: existingClient.Item?.createdAt as Date
    })

    await this.dynamoDBClient.put({
      TableName: 'ClientsTable',
      Item: clientToUpdate
    }).promise()
  }

  async deleteClient (id: string): Promise<void> {
    await this.dynamoDBClient.delete({
      TableName: 'ClientsTable',
      Key: { id }
    }).promise()
  }

  async getClientById (id: string): Promise<ClientEntity | undefined> {
    const client = await this.dynamoDBClient.get({
      TableName: 'ClientsTable',
      Key: { id }
    }).promise()
    if (client.Item == null) return undefined
    return new ClientEntity({
      id: client.Item?.id as string,
      name: client.Item?.name as string,
      email: client.Item?.email as string,
      availableCredit: client.Item?.availableCredit as number,
      createdAt: new Date(client.Item?.createdAt as string)
    })
  }

  async getClientByEmail (email: string): Promise<ClientEntity | undefined> {
    const clients = await this.dynamoDBClient.scan({
      TableName: 'ClientsTable',
      FilterExpression: 'email = :email',
      ExpressionAttributeValues: { ':email': email }
    }).promise()
    const client = clients.Items?.find(client => client.email === email)
    if (client == null) return undefined
    return new ClientEntity({
      id: client.id as string,
      name: client.name as string,
      email: client.email as string,
      availableCredit: client.availableCredit as number,
      createdAt: new Date(client.createdAt as string)
    })
  }

  async updateCredits (id: string, credits: number): Promise<void> {
    await this.dynamoDBClient.update({
      TableName: 'ClientsTable',
      Key: { id },
      UpdateExpression: 'set availableCredit = :credits',
      ExpressionAttributeValues: { ':credits': credits }
    }).promise()
  }
}
