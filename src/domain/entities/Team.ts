import { Player } from '@/domain/entities/Player'
import { TeamPlayer } from '@/domain/entities/TeamPlayer'
import { PlayerRole } from '@/domain/enums/PlayerRole'

export class Team {
  private readonly id: string
  private readonly leader: Player
  private readonly name: string
  private readonly logo: string
  private readonly teamPlayers: TeamPlayer[] = []

  constructor (id: string, name: string, logo: string, leader: Player) {
    this.id = id
    this.name = name
    this.logo = logo
    this.leader = leader
    this.teamPlayers.push(new TeamPlayer(leader, this.id, PlayerRole.LEADER))
  }

  addPlayer (player: Player): void {
    this.teamPlayers.push(new TeamPlayer(player, this.id, PlayerRole.COMMON))
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

  getLeaderId (): string {
    return this.leader.getId()
  }
}
