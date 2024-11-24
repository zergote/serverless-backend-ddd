interface IProps {
  id?: string
  name: string
  email: string
  availableCredit: number
  createdAt?: Date
}

export class ClientDto {
  name: string
  email: string
  availableCredit: number

  constructor (props: IProps) {
    const { name, email, availableCredit } = this.validate(props)
    this.name = name
    this.email = email
    this.availableCredit = availableCredit
  }

  validate (props: IProps): IProps {
    if (props.name === '') {
      throw new Error('Name is required')
    }

    if (!/.+@.+/.test(props.email)) {
      throw new Error('Email is required and must be valid')
    }
    if (isNaN(props.availableCredit)) {
      throw new Error('Available credit is required')
    }

    return props
  }
}
