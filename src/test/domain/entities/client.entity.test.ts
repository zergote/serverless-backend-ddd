import { ClientEntity } from '../../../domain'

describe('ClientEntity', () => {
  it('should create a client', () => {
    const client = new ClientEntity({ id: "uuidxd-a3df-asd5", name: 'Test Client', email: 'test@test.com', availableCredit: 1000, createdAt: new Date() })
    expect(client).toBeDefined()
  })

  it('should throw an error if name is empty', () => {
    expect(() => new ClientEntity({ id: "uuidxd-a3df-asd5", name: '', email: 'test@test.com', availableCredit: 1000, createdAt: new Date() })).toThrow('Invalid client data')
  })

  it('should throw an error if email is empty', () => {
    expect(() => new ClientEntity({ id: "uuidxd-a3df-asd5", name: 'Test Client', email: '', availableCredit: 1000, createdAt: new Date() })).toThrow('Invalid client data')
  })

  it('should throw an error if availableCredit is not a number', () => {
    expect(() => new ClientEntity({ id: "uuidxd-a3df-asd5", name: 'Test Client', email: 'test@test.com', availableCredit: NaN, createdAt: new Date() })).toThrow('Available credit is required')
  })

  it('should throw an error if email is not valid', () => {
    expect(() => new ClientEntity({ id: "uuidxd-a3df-asd5", name: 'Test Client', email: 'test', availableCredit: 1000, createdAt: new Date() })).toThrow('Email is required and must be valid')
  })
})
