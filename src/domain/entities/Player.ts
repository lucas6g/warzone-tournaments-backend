export class Player {
  constructor (
    private readonly id: string,
    private readonly name: string,
    private readonly email: string,
    private readonly password: string,
    private readonly kdLevel: number,
    private readonly pixKey: string,
    private readonly gamerTag: string,
    private readonly platForm: string
  ) {}

  getKdLevel (): number {
    return this.kdLevel
  }

  getName (): string {
    return this.name
  }

  getId (): string {
    return this.id
  }
}
