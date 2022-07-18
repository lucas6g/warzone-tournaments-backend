import { Player } from '@/domain/entities/Player'

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

  getPlayers (): Player[] {
    const player1 = new Player(1.25)
    const player2 = new Player(1.12)
    const player3 = new Player(1.11)

    return [player1, player2, player3]
  }
}
