import { Player } from '@/domain/entities/Player'

export class Team {
  private readonly id: string
  private readonly playerId: string
  private readonly name: string
  private readonly logo: string
  private readonly players: Player[]

  constructor (id: string, name: string, logo: string, playerId: string) {
    this.id = id
    this.name = name
    this.logo = logo
    this.playerId = playerId
    this.players = []
  }

  addPlayer (player: Player): void {
    this.players.push(player)
  }

  getId (): string {
    return this.id
  }

  getTotalPlayers (): number {
    return this.players.length
  }

  getPlayers (): Player[] {
    return this.players
  }

  getPlayerId (): string {
    return this.playerId
  }
}
