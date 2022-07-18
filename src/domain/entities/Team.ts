export class Team {
  private readonly id: string
  private readonly name: string
  private readonly logo: string

  constructor (id: string, name: string, logo: string) {
    this.id = id
    this.name = name
    this.logo = logo
  }

  getId (): string {
    return this.id
  }

  getTotalPlayers (): number {
    return 3
  }
}
