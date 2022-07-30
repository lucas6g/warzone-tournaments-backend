import { Player } from '@/domain/entities/Player'
import { TeamPlayer } from '@/domain/entities/TeamPlayer'
import { PlayerRole } from '@/domain/enums/PlayerRole'

export class Team {
  private readonly id: string
  private readonly playerId: string
  private readonly name: string
  private readonly logo: string
  private readonly teamPlayers: TeamPlayer[] = []

  constructor (id: string, name: string, logo: string, playerId: string) {
    this.id = id
    this.name = name
    this.logo = logo
    this.playerId = playerId
    this.teamPlayers.push(new TeamPlayer(playerId, this.id, PlayerRole.LEADER))
  }

  addPlayer (player: Player): void {
    this.teamPlayers.push(
      new TeamPlayer(
        player.getId(),
        this.id,
        PlayerRole.COMMON,
        player.getKdLevel()
      )
    )
  }

  getId (): string {
    return this.id
  }

  getTotalPlayers (): number {
    return this.teamPlayers.length
  }

  getTeamPlayers (): TeamPlayer[] {
    return this.teamPlayers
  }

  getPlayerId (): string {
    return this.playerId
  }
}
