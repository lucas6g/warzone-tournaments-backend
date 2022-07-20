import { Team } from '@/domain/entities/Team'

export class TeamSubscription {
  private readonly team: Team
  private readonly date: Date
  constructor (team: Team, date: Date) {
    this.team = team
    this.date = date
  }

  getTeam (): Team {
    return this.team
  }

  calculateTotal (coust: number): number {
    return this.team.getTotalPlayers() * coust
  }
}
