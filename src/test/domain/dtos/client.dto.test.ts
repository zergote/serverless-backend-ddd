import { ClientDto } from '../../../domain'

describe('ClientDto', () => {
  it('should create a client', () => {
    const client = new ClientDto({ name: 'Test Client', email: 'test@test.com', availableCredit: 1000 })
    expect(client).toBeDefined()
  })
  it('should throw an error if name is empty', () => {
    expect(() => new ClientDto({ name: '', email: 'test@test.com', availableCredit: 1000 })).toThrow('Name is required')
  })
})
