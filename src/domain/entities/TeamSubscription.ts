import { Payment } from '@/domain/entities/Payment'
import { Team } from '@/domain/entities/Team'
import { Tournament } from '@/domain/entities/Tournament'
import { TeamSubscriptionError } from '@/domain/errors/TeamSubscriptionError'

export class TeamSubscription {
  constructor (
    private readonly tournament: Tournament,
    private readonly team: Team,
    private readonly payment: Payment,
    private readonly date: Date = new Date(Date.now())
  ) {
    if (team.getTotalPlayers() !== tournament.getGame().getGameType()) {
      throw new TeamSubscriptionError(
        'number of team players is different from the type of game'
      )
    }
    if (this.isDuringTournamentPeriod(tournament, date)) {
      throw new TeamSubscriptionError(
        'subscription denied tournament is already in progress'
      )
    }
    const isAfterTournamentEnds =
      date.getTime() >= tournament.getEndAt().getTime()
    if (isAfterTournamentEnds) {
      throw new TeamSubscriptionError('subscription denied tournament is over')
    }
    if (this.hasTeamMemberKdGreaterThankillDeathRatioLimit(tournament, team)) {
      throw new TeamSubscriptionError(
        'subscription denied team member kd level is bigger than Tounament killDeathRatioLimit'
      )
    }

    if (payment.getStatus() !== 'PAID') {
      throw new TeamSubscriptionError(
        'subscription denied tournoment fee was not paid'
      )
    }

    this.tournament = tournament
    this.payment = payment
    this.team = team
    this.date = date
  }

  private isDuringTournamentPeriod (
    tournament: Tournament,
    susbcriptionDate: Date
  ): boolean {
    return (
      susbcriptionDate.getTime() >= tournament.getStartAt().getTime() &&
      susbcriptionDate.getTime() <= tournament.getEndAt().getTime()
    )
  }

  private hasTeamMemberKdGreaterThankillDeathRatioLimit (
    tournament: Tournament,
    team: Team
  ): boolean {
    const teamMember = team
      .getTeamPlayers()
      .filter(
        teamMember =>
          teamMember.getKdLevel() > tournament.getkillDeathRatioLimit()
      )

    return teamMember.length > 0
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
