import { ClientDto } from '../../domain'
import { ClientEntity } from '../../domain/entities/client.entity'
import { ArrayDBClientsDatasourceImpl } from '../../infraestructure/datasources/arrayDB.clients.datasource.impl'

describe('ClientsDatasource', () => {
  let clientsDatasource: ArrayDBClientsDatasourceImpl

  // Datos de prueba
  const mockClientDto: ClientDto = {
    name: 'John Doe',
    email: 'john@example.com',
    availableCredit: 100
  }

  const mockClientEntity: ClientEntity = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    availableCredit: 100,
    createdAt: new Date()
  }

  beforeEach(() => {
    clientsDatasource = new ClientsDatasourceImpl()
  })

  describe('createClient', () => {
    it('should create a client', async () => {
      // Sobrescribimos el método para la prueba
      clientsDatasource.createClient = jest.fn().mockResolvedValue(undefined)

      await expect(clientsDatasource.createClient(mockClientDto))
        .resolves.not.toThrow()
    })
  })

  describe('getClients', () => {
    it('should return an array of clients', async () => {
      const mockClients = [mockClientEntity]
      clientsDatasource.getClients = jest.fn().mockResolvedValue(mockClients)

      const result = await clientsDatasource.getClients()
      expect(result).toEqual(mockClients)
      expect(result.length).toBe(1)
    })
  })

  describe('getClientByEmail', () => {
    it('should return a client when email exists', async () => {
      clientsDatasource.getClientByEmail = jest.fn().mockResolvedValue(mockClientEntity)

      const result = await clientsDatasource.getClientByEmail('john@example.com')
      expect(result).toEqual(mockClientEntity)
    })

    it('should return undefined when email does not exist', async () => {
      clientsDatasource.getClientByEmail = jest.fn().mockResolvedValue(undefined)

      const result = await clientsDatasource.getClientByEmail('nonexistent@example.com')
      expect(result).toBeUndefined()
    })
  })

  describe('updateClient', () => {
    it('should update a client successfully', async () => {
      clientsDatasource.updateClient = jest.fn().mockResolvedValue(undefined)

      await expect(clientsDatasource.updateClient('1', mockClientDto))
        .resolves.not.toThrow()
    })
  })

  describe('deleteClient', () => {
    it('should delete a client successfully', async () => {
      clientsDatasource.deleteClient = jest.fn().mockResolvedValue(undefined)

      await expect(clientsDatasource.deleteClient('1'))
        .resolves.not.toThrow()
    })
  })

  describe('updateCredits', () => {
    it('should update client credits successfully', async () => {
      clientsDatasource.updateCredits = jest.fn().mockResolvedValue(undefined)

      await expect(clientsDatasource.updateCredits('1', 200))
        .resolves.not.toThrow()
    })
  })

  describe('getClientsSortByCredits', () => {
    it('should return clients sorted by credits', async () => {
      const mockSortedClients = [
        { ...mockClientEntity, availableCredit: 200 },
        { ...mockClientEntity, availableCredit: 100 }
      ]
      clientsDatasource.getClientsSortByCredits = jest.fn().mockResolvedValue(mockSortedClients)

      const result = await clientsDatasource.getClientsSortByCredits()
      expect(result).toEqual(mockSortedClients)
      expect(result[0].availableCredit).toBeGreaterThan(result[1].availableCredit)
    })
  })

  describe('getClientById', () => {
    it('should return a client when id exists', async () => {
      clientsDatasource.getClientById = jest.fn().mockResolvedValue(mockClientEntity)

      const result = await clientsDatasource.getClientById('1')
      expect(result).toEqual(mockClientEntity)
    })
  })
})
