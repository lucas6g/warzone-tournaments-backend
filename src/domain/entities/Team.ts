import { Player } from '@/domain/entities/Player'
import { PlayerRole } from '@/domain/enums/PlayerRole'

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
    const player1 = new Player(
      'anyId',
      'anyName',
      'anyEmail',
      'anyPassword',
      1.2,
      'anyPixkey',
      PlayerRole.COMMON,
      'anyGamerTag',
      'anyPlatForm'
    )
    const player2 = new Player(
      'anyId',
      'anyName',
      'anyEmail',
      'anyPassword',
      1.12,
      'anyPixkey',
      PlayerRole.COMMON,
      'anyGamerTag',
      'anyPlatForm'
    )
    const player3 = new Player(
      'anyId',
      'anyName',
      'anyEmail',
      'anyPassword',
      1.11,
      'anyPixkey',
      PlayerRole.COMMON,
      'anyGamerTag',
      'anyPlatForm'
    )

    return [player1, player2, player3]
  }

  getPlayerId (): string {
    return this.playerId
  }
}
