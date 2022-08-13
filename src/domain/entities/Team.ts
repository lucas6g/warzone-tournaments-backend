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
    private readonly leader: Player
  ) {
    this.teamPlayers.push(new TeamPlayer(leader, this.id, PlayerRole.LEADER))
    this.tournamentScores = []
  }

  addPlayer (player: Player): void {
    this.teamPlayers.push(new TeamPlayer(player, this.id, PlayerRole.COMMON))
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
    return this.leader.getId()
  }

  getName (): string {
    return this.name
  }
}
