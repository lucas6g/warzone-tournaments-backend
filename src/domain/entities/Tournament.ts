import { Game } from '@/domain/entities/Game'
import { Team } from '@/domain/entities/Team'
import { TeamSubscription } from '@/domain/entities/TeamSubscriction'
import { InvalidPreviosDateError } from '@/domain/errors/InvalidPreviosDateError'
import { TournamentError } from '@/domain/errors/TournamentError'

export class Tournament {
  constructor (
    private readonly id: string,
    private readonly startAt: Date,
    private readonly endAt: Date,
    private readonly registrationCoust: number,
    private readonly killDeathRatioLimit: number,
    private readonly game: Game,
    private readonly teamSubscriptions: TeamSubscription[] = []
  ) {
    if (!this.isValidDate(startAt) || !this.isValidDate(endAt)) {
      throw new InvalidPreviosDateError('Invalid previos date')
    }
  }

  getPrize (): number {
    return this.teamSubscriptions.reduce((total, teamSubscription) => {
      return total + teamSubscription.calculateTotal(this.registrationCoust)
    }, 0)
  }

  subscribeTeam (
    team: Team,
    susbcriptionDate: Date = new Date(Date.now())
  ): void {
    if (team.getTotalPlayers() !== this.game.getGameType()) {
      throw new TournamentError(
        'number of team players is different from the type of game'
      )
    }
    if (this.isDuringTournamentPeriod(susbcriptionDate)) {
      throw new TournamentError(
        'subscription denied tournament is already in progress'
      )
    }
    const isAfterTournamentEnds =
      susbcriptionDate.getTime() >= this.endAt.getTime()
    if (isAfterTournamentEnds) {
      throw new TournamentError('subscription denied tournament is over')
    }

    if (this.hasTeamMemberKdGreaterThankillDeathRatioLimit(team)) {
      throw new TournamentError(
        'subscription denied team member kd level is bigger than Tounament killDeathRatioLimit'
      )
    }

    this.teamSubscriptions.push(
      new TeamSubscription(team, susbcriptionDate, this)
    )
  }

  private isDuringTournamentPeriod (susbcriptionDate: Date): boolean {
    return (
      susbcriptionDate.getTime() >= this.startAt.getTime() &&
      susbcriptionDate.getTime() <= this.endAt.getTime()
    )
  }

  private hasTeamMemberKdGreaterThankillDeathRatioLimit (team: Team): boolean {
    const players = team
      .getPlayers()
      .filter(player => player.getKdLevel() > this.killDeathRatioLimit)

    return players.length > 0
  }

  getNumberOfTeamsRegistered (): number {
    return this.teamSubscriptions.length
  }

  isValidDate (date: Date, today: Date = new Date(Date.now())): boolean {
    const isPastDate = date.getTime() < today.getTime()
    if (isPastDate) {
      return false
    }
    return true
  }

  getGame (): Game {
    return this.game
  }

  getRegistrationCoust (): number {
    return this.registrationCoust
  }
}
