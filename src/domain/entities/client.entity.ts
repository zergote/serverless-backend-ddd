/**
 * Representa la entidad de clientes con operaciones de comprobacion de datos básicos
 * y operaciones específicas del dominio.
 */
interface IProps {
  id: string
  name: string
  email: string
  availableCredit: number
  createdAt: Date
}

export class ClientEntity {
  public id: string
  public name: string
  public email: string
  public availableCredit: number
  public createdAt: Date

  constructor (props: IProps) {
    this.validate(props)
    this.id = props.id
    this.name = props.name
    this.email = props.email
    this.availableCredit = props.availableCredit
    this.createdAt = props.createdAt

    if (isNaN(props.availableCredit)) {
      throw new Error('Available credit is required');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(props.email)) {
      throw new Error('Email is required and must be valid');
    }
  }

  validate (props: IProps): IProps {
    const { id, name, email, availableCredit, createdAt } = props

    if (id === '' || name === '' || email === '' ||
      availableCredit === undefined || createdAt === undefined) {
      throw new Error('Invalid client data')
    }
    return props
  }
}
