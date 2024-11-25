// test clien
import { ClientDto, ClientEntity } from '../../../domain'
import { ClientsDatasource } from '../../../domain/datasources/clients.datasource'

describe('ClientsDatasource', () => {
  let mockClientsDatasource: ClientsDatasource

  beforeEach(() => {
    // Creamos un mock que implementa la interfaz ClientsDatasource
    mockClientsDatasource = {
      getClients: jest.fn(),
      getClientById: jest.fn(),
      getClientByEmail: jest.fn(),
      createClient: jest.fn(),
      updateClient: jest.fn(),
      deleteClient: jest.fn(),
      updateCredits: jest.fn(),
      getClientsSortByCredits: jest.fn()
    }
  })

  it('should call getClients method', async () => {
    const mockClients: ClientEntity[] = [
      new ClientEntity({
        id: '1',
        name: 'Test Client',
        email: 'test@test.com',
        availableCredit: 1000,
        createdAt: new Date()
      })
    ]

    // Configuramos el mock
    jest.spyOn(mockClientsDatasource, 'getClients').mockResolvedValue(mockClients)

    // Ejecutamos el método
    const result = await mockClientsDatasource.getClients()

    // Verificamos que el método fue llamado
    expect(mockClientsDatasource.getClients).toHaveBeenCalled()
    // Verificamos el resultado
    expect(result).toEqual(mockClients)
  })

  it('should call createClient method', async () => {
    const mockClient = new ClientDto({
      name: 'Test Client',
      email: 'test@test.com',
      availableCredit: 1000
    })

    await mockClientsDatasource.createClient(mockClient)

    expect(mockClientsDatasource.createClient).toHaveBeenCalledWith(mockClient)
  })
})
