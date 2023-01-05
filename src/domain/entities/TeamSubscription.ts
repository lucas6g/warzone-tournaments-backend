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
    if (team.getTotalPlayers() !== tournament.getType()) {
      throw new TeamSubscriptionError(
        'number of team players is different from the type of tournament'
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
    if (
      this.hasTeamMemberKdGreaterThankillDeathRatioLimit(
        tournament.getkillDeathRatioLimit(),
        team
      )
    ) {
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
    this.team = team
    this.payment = payment
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
    tournamentKdLimit: number,
    team: Team
  ): boolean {
    const teamMember = team
      .getTeamPlayers()
      .filter(teamMember => teamMember.getKdLevel() > tournamentKdLimit)

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
