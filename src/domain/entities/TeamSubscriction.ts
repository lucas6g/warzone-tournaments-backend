import { Team } from '@/domain/entities/Team'
import { Tournament } from '@/domain/entities/Tournament'

export class TeamSubscription {
  private readonly tournament: Tournament
  private readonly team: Team
  private readonly date: Date
  constructor (team: Team, date: Date, tournament: Tournament) {
    this.team = team
    this.date = date
    this.tournament = tournament
  }

  getTeam (): Team {
    return this.team
  }

  getTournament (): Tournament {
    return this.tournament
  }

  calculateTotal (coust: number): number {
    return this.team.getTotalPlayers() * coust
  }
}
