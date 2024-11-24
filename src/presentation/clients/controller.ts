import type { Request, Response } from 'express'
import { ClientDto, ClientsRepository, CreateClientUseCase } from '../../domain'

// import { ContactDto, ContactsRepository, CreateContact, GetContacts } from '../../domain';

export class ClientsController {
  constructor (private readonly clientsRepository: ClientsRepository) { }

  public CreateClient = async (req: Request, res: Response): Promise<void> => {
    const clientDTO = new ClientDto(req.body)
    new CreateClientUseCase(this.clientsRepository).execute(clientDTO)
      .then(() => {
        res.status(201).json({ message: 'Client created successfully' })
      })
      .catch((error) => {
        res.status(500).json({ message: error.message })
      })
  }
}
