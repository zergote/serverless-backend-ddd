import { ClientsRepositoryImpl } from "../../../infraestructure/repositories/clients.repository.impl";
import { ClientDto } from "../../../domain/dtos/client.dto";
import { ArrayDBClientsDatasourceImpl } from "../../../infraestructure/datasources/arrayDB.clients.datasource.impl";


describe('ClientsRepositoryImpl', () => {
  let clientsRepositoryImpl: ClientsRepositoryImpl;
  const arrayDBClientsDatasourceImpl = new ArrayDBClientsDatasourceImpl();
  beforeEach(() => {
    clientsRepositoryImpl = new ClientsRepositoryImpl(arrayDBClientsDatasourceImpl);
  });

  it('should create a client', async () => {
    const clientDto = new ClientDto({
      name: 'Test User',
      email: 'test@example.com',
      availableCredit: 0
    });
    await clientsRepositoryImpl.createClient(clientDto);
    const clients = await arrayDBClientsDatasourceImpl.getClients();
    // 5 clients already in the mock and add one more
    expect(clients).toHaveLength(6);
    expect(clients[5].name).toBe(clientDto.name);
    expect(clients[5].email).toBe(clientDto.email);
    expect(clients[5].availableCredit).toBe(clientDto.availableCredit);
  });

  it('should get all clients', async () => {
    const clients = await clientsRepositoryImpl.getClients();
    expect(clients).toHaveLength(6);
  });

  it('should delete a client', async () => {
    await clientsRepositoryImpl.deleteClient('ec2ab7d0-972a-47cc-8924-390a68ab8465');
    const clients = await arrayDBClientsDatasourceImpl.getClients();
    expect(clients).toHaveLength(5);
  });

  it('should update a client', async () => {
    // Primero obtener los clientes para usar un ID existente
    const clients = await arrayDBClientsDatasourceImpl.getClients();
    const existingClient = clients[0];

    const clientDto = new ClientDto({
      name: 'Test User Updated',
      email: 'test.updated@example.com',
      availableCredit: 100  // Cambiamos a 100 para que coincida con la expectativa
    });

    await clientsRepositoryImpl.updateClient(existingClient.id, clientDto);

    // Obtenemos el cliente actualizado
    const updatedClient = await clientsRepositoryImpl.getClientById(existingClient.id);

    expect(updatedClient?.availableCredit).toBe(100);
    expect(updatedClient?.name).toBe('Test User Updated');
    expect(updatedClient?.email).toBe('test.updated@example.com');
  });

  it('should get clients sort by credits', async () => {
    const clients = await clientsRepositoryImpl.getClientsSortByCredits();
    // Verificar que los clientes estén ordenados correctamente
    expect(clients).toBeDefined();
    expect(Array.isArray(clients)).toBe(true);
    // Verificar que el último cliente tenga el crédito más bajo
    expect(clients[clients.length - 1].availableCredit).toBe(0);
  });

  it('should get a client by id', async () => {
    // Primero obtener todos los clientes para usar un ID existente
    const clients = await arrayDBClientsDatasourceImpl.getClients();
    const existingClient = clients[0]; // Tomamos el primer cliente del mock

    const client = await clientsRepositoryImpl.getClientById(existingClient.id);
    expect(client).toBeDefined();
    expect(client?.id).toBe(existingClient.id);
  });

  it('should get a client by email', async () => {
    const client = await clientsRepositoryImpl.getClientByEmail('test@example.com');
    expect(client).toBeDefined();
    expect(client?.email).toBe('test@example.com');
  });

});
