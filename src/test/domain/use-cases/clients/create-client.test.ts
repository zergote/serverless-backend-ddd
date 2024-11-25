import { CreateClientUseCase } from "../../../../domain/use-cases";
import { ClientsRepository } from "../../../../domain/repositories/clients.repository";
import { ClientDto } from "../../../../domain/dtos/client.dto";
import { ClientEntity } from "../../../../domain/entities/client.entity";

describe('CreateClientUseCase', () => {
  let createClientUseCase: CreateClientUseCase;
  let clientRepository: ClientsRepository;

  beforeEach(() => {
    clientRepository = {
      createClient: jest.fn(),
      getClientById: jest.fn(),
      getClients: jest.fn(),
      updateClient: jest.fn(),
      deleteClient: jest.fn(),
      getClientByEmail: jest.fn(),
      getClientsWithNegativeCredit: jest.fn(),
      getClientsSortByCredits: jest.fn(),
      updateCredits: jest.fn(),
    } as jest.Mocked<ClientsRepository>;
    createClientUseCase = new CreateClientUseCase(clientRepository);
  });

  it('should create a new client', async () => {
    const clientDto = new ClientDto({
      name: 'Juan Pérez',
      email: 'juan@example.com',
      availableCredit: 100
    });
    await createClientUseCase.execute(clientDto);
  });

  it('should throw an error if the client already exists', async () => {
    const clientDto = new ClientDto({
      name: 'Test User',
      email: 'test@example.com',
      availableCredit: 0
    });
    jest.spyOn(clientRepository, 'getClientByEmail').mockResolvedValue(new ClientEntity({
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      availableCredit: 0,
      createdAt: new Date()
    }));
    await expect(createClientUseCase.execute(clientDto)).rejects.toThrow('Client email already exists');
  });

  it('should throw an error if the client email is invalid', async () => {
    expect(() => new ClientDto({
      name: 'Juan Pérez',
      email: 'invalid-email',
      availableCredit: 100
    })).toThrow('Email is required and must be valid');
  });

});

