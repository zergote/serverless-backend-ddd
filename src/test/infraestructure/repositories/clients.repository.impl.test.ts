import { ClientDto } from '../../../domain/dtos/client.dto'
import { ClientsRepositoryImpl } from '../../../infraestructure/repositories/clients.repository.impl'
import { DynamoDBClientsDatasourceImpl } from '../../../infraestructure/datasources/dynamoDB.clients.datasource.impl'
import AWS from 'aws-sdk'
import { ClientEntity } from '../../../domain/entities/client.entity'

// Mock de DynamoDB
const mockDynamoDB = {
  scan: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
  query: jest.fn(),
}

// Mock del método promise
const mockPromise = jest.fn()

describe('ClientsRepositoryImpl', () => {
  let repository: ClientsRepositoryImpl
  let testClient: ClientDto
  let datasource: DynamoDBClientsDatasourceImpl

  beforeAll(() => {
    // Mock del DocumentClient
    jest.spyOn(AWS.DynamoDB, 'DocumentClient').mockImplementation(() => ({
      scan: () => ({ promise: mockPromise }),
      put: () => ({ promise: mockPromise }),
      delete: () => ({ promise: mockPromise }),
      update: () => ({ promise: mockPromise }),
      query: () => ({ promise: mockPromise }),
    } as any))

    // Crear el datasource y mockearlo
    datasource = new DynamoDBClientsDatasourceImpl()
    jest.spyOn(datasource, 'createClient').mockImplementation(async (client) => {
      return;
    })

    jest.spyOn(datasource, 'getClients').mockImplementation(async () => {
      return [new ClientEntity({
        id: 'test-id',
        name: testClient.name,
        email: testClient.email,
        availableCredit: testClient.availableCredit,
        createdAt: new Date()
      })]
    })

    repository = new ClientsRepositoryImpl(datasource)
    testClient = new ClientDto({
      name: 'Test Client',
      email: 'test@test.com',
      availableCredit: 1000
    })
  })

  beforeEach(() => {
    // Limpiar todos los mocks antes de cada prueba
    jest.clearAllMocks()

    // Configurar el comportamiento predeterminado del mock
    mockPromise.mockResolvedValue({ Items: [] })
  })

  it('should create a client', async () => {
    await repository.createClient(testClient)
    const clients = await repository.getClients()
    expect(clients.length).toBe(1)
    expect(clients[0].name).toBe(testClient.name)
  })

  // TODO: Completar con el resto de las pruebas
})
