import { Game } from '@/domain/entities/Game'
import { Team } from '@/domain/entities/Team'
import { TeamSubscription } from '@/domain/entities/TeamSubscriction'
import { InvalidPreviosDateError } from '@/domain/errors/InvalidPreviosDateError'
import { TournamentError } from '@/domain/errors/TournamentError'

export class Tournament {
  private readonly id: string
  private readonly startAt: Date
  private readonly endAt: Date
  private readonly registrationCoust: number
  private readonly killDeathRatioLimit: number
  private readonly game: Game
  private readonly teamSubscriptions: TeamSubscription[]

  constructor (
    id: string,
    startAt: Date,
    endAt: Date,
    registrationCoust: number,
    killDeathRatioLimit: number,
    game: Game
  ) {
    if (!this.isValidDate(startAt) || !this.isValidDate(endAt)) {
      throw new InvalidPreviosDateError('Invalid previos date')
    }
    this.id = id
    this.startAt = startAt
    this.endAt = endAt
    this.registrationCoust = registrationCoust
    this.killDeathRatioLimit = killDeathRatioLimit
    this.game = game
    this.teamSubscriptions = []
  }

  getPrize (): number {
    let prize = 0
    for (const teamSubscription of this.teamSubscriptions) {
      prize += teamSubscription.calculateTotal(this.registrationCoust)
    }
    return prize
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
    this.teamSubscriptions.push(new TeamSubscription(team, susbcriptionDate))
  }

  private isDuringTournamentPeriod (susbcriptionDate: Date): boolean {
    return (
      susbcriptionDate.getTime() >= this.startAt.getTime() &&
      susbcriptionDate.getTime() <= this.endAt.getTime()
    )
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
}
