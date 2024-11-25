import type { Request, Response } from 'express'
import { ClientDto, ClientEntity, ClientsRepository, CreateClientUseCase, GetClientsSortByCredits, UpdateCredits, UpdateClient, DeleteClient, GetClientById, GetClients, GetClientByEmail } from '../../domain'

// import { ContactDto, ContactsRepository, CreateContact, GetContacts } from '../../domain';

export class ClientsController {
  constructor (private readonly clientsRepository: ClientsRepository) { }

  public CreateClient = async (req: Request, res: Response): Promise<void> => {
    const clientDTO = new ClientDto(req.body)
    new CreateClientUseCase(this.clientsRepository).execute(clientDTO)
      .then(() => {
        return res.status(201).json({ message: 'Client created successfully' })
      })
      .catch((error) => {
        return res.status(500).json({ message: error.message })
      })
  }

  public GetClients = async (req: Request, res: Response): Promise<void> => {
    new GetClients(this.clientsRepository).execute()
      .then((clients: ClientEntity[]) => {
        return res.status(200).json(clients)
      })
      .catch((error: Error) => {
        return res.status(500).json({ message: error.message })
      })
  }

  public GetClientByEmail = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.params
    new GetClientByEmail(this.clientsRepository).execute(email)
      .then((client: ClientEntity | undefined) => {
        return res.status(200).json(client)
      })
      .catch((error: Error) => {
        return res.status(500).json({ message: error.message })
      })
  }

  public GetClientById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    new GetClientById(this.clientsRepository).execute(id)
      .then((client: ClientEntity | undefined) => {
        return res.status(200).json(client)
      })
      .catch((error: Error) => {
        return res.status(500).json({ message: error.message })
      })
  }

  public GetClientsSortByCredits = async (req: Request, res: Response): Promise<void> => {
    new GetClientsSortByCredits(this.clientsRepository).execute()
      .then((clients: ClientEntity[]) => {
        return res.status(200).json(clients)
      })
      .catch((error: Error) => {
        return res.status(500).json({ message: error.message })
      })
  }

  public UpdateCredits = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    const { credits } = req.body
    new UpdateCredits(this.clientsRepository).execute(id, credits)
      .then(() => {
        return res.status(200).json({ message: 'Credits updated successfully' })
      })
      .catch((error: Error) => {
        return res.status(500).json({ message: error.message })
      })
  }

  public UpdateClient = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    const clientDTO = new ClientDto(req.body)
    new UpdateClient(this.clientsRepository).execute(id, clientDTO)
      .then(() => {
        return res.status(200).json({ message: 'Client updated successfully' })
      })
      .catch((error: Error) => {
        return res.status(500).json({ message: error.message })
      })
  }

  public DeleteClient = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    new DeleteClient(this.clientsRepository).execute(id)
      .then(() => {
        return res.status(200).json({ message: 'Client deleted successfully' })
      })
      .catch((error: Error) => {
        return res.status(500).json({ message: error.message })
      })
  }
}
