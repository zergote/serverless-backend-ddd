interface Props {
  id: string;
  name: string;
  email: string;
  availableCredit: number;
  createdAt: Date;
}

export class ClientEntity {
  public id: string;
  public name: string;
  public email: string;
  public availableCredit: number;
  public createdAt: Date;

  constructor(props: Props) {
    this.validate(props);
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.availableCredit = props.availableCredit;
    this.createdAt = props.createdAt;
  }

  validate(props: Props) {
    const { id, name, email, availableCredit, createdAt } = props;

    if (!id || !name || !email || !availableCredit || !createdAt) {
      throw new Error('Invalid client data');
    }
  }
}
