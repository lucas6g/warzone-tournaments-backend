import { Player } from '@/domain/entities/Player'
import { TeamPlayer } from '@/domain/entities/TeamPlayer'
import { TournamentScore } from '@/domain/entities/TournamentScore'
import { PlayerRole } from '@/domain/enums/PlayerRole'

export class Team {
  private readonly teamPlayers: TeamPlayer[] = []
  private readonly tournamentScores: TournamentScore[]

  constructor (
    private readonly id: string,
    private readonly name: string,
    private readonly logo: string,
    private readonly leaderId: string
  ) {
    this.teamPlayers.push(new TeamPlayer(leaderId, this.id, PlayerRole.LEADER))
    this.tournamentScores = []
  }

  addPlayer (player: Player): void {
    this.teamPlayers.push(
      new TeamPlayer(player.getId(), this.id, PlayerRole.COMMON)
    )
  }

  addTournamentScore (tounamentScore: TournamentScore): void {
    this.tournamentScores.push(tounamentScore)
  }

  getTournamentScores (): TournamentScore[] {
    return this.tournamentScores
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
    return this.leaderId
  }

  getLogo (): string {
    return this.logo
  }

  getName (): string {
    return this.name
  }
}
