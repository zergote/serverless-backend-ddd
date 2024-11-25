import { ClientDto, ClientEntity, ClientsRepository } from '../../../domain'

describe('ClientsRepository', () => {
  let mockRepository: MockClientsRepository;

  beforeEach(() => {
    mockRepository = new MockClientsRepository();
  });

  it('should create a client successfully', async () => {
    // Arrange
    const clientDto: ClientDto = new ClientDto({
      name: 'Juan Pérez',
      email: 'juan@example.com',
      availableCredit: 100
    });

    // Act & Assert
    await expect(mockRepository.createClient(clientDto)).resolves.not.toThrow();
  });

  it('should get client by email', async () => {
    // Arrange
    const email = 'juan@example.com';
    const expectedClient = new ClientEntity({
      id: '1',
      name: 'Juan Pérez',
      email: 'juan@example.com',
      availableCredit: 100,
      createdAt: new Date()
    });

    jest.spyOn(mockRepository, 'getClientByEmail')
      .mockResolvedValue(expectedClient);

    // Act
    const result = await mockRepository.getClientByEmail(email);

    // Assert
    expect(result).toEqual(expectedClient);
  });

  it('should update client credits', async () => {
    // Arrange
    const clientId = '1';
    const newCredits = 150;

    // Act & Assert
    await expect(mockRepository.updateCredits(clientId, newCredits)).resolves.not.toThrow();
  });
})

class MockClientsRepository extends ClientsRepository {
  private clients: ClientEntity[] = [];

  async createClient (client: ClientDto): Promise<void> {
    const newClient = {
      id: Math.random().toString(),
      createdAt: new Date(),
      ...client
    };
    this.clients.push(new ClientEntity(newClient));
  }

  async getClientByEmail (email: string): Promise<ClientEntity | undefined> {
    return this.clients.find(client => client.email === email);
  }

  async updateCredits (id: string, credits: number): Promise<void> {
    const client = this.clients.find(c => c.id === id);
    if (client) {
      client.availableCredit = credits;
    }
  }

  async getClients (): Promise<ClientEntity[]> {
    return this.clients
  }

  async getClientById (id: string): Promise<ClientEntity | undefined> {
    return this.clients.find(client => client.id === id);
  }

  async updateClient (id: string, client: ClientDto): Promise<void> {
    const clientIndex = this.clients.findIndex(c => c.id === id);
    if (clientIndex !== -1) {
      this.clients[clientIndex] = new ClientEntity({ ...this.clients[clientIndex], ...client });
    }
  }
  async deleteClient (id: string): Promise<void> {
    const clientIndex = this.clients.findIndex(c => c.id === id);
    if (clientIndex !== -1) {
      this.clients.splice(clientIndex, 1);
    }
  }

  async getClientsSortByCredits (): Promise<ClientEntity[]> {
    return this.clients.sort((a, b) => b.availableCredit - a.availableCredit);
  }

}
