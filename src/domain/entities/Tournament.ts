import { Game } from '@/domain/entities/Game'
import { TeamSubscription } from '@/domain/entities/TeamSubscription'
import { InvalidPreviosDateError } from '@/domain/errors/InvalidPreviosDateError'

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

  addSubscription (susbcription: TeamSubscription): void {
    this.teamSubscriptions.push(susbcription)
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

  getStartAt (): Date {
    return this.startAt
  }

  getEndAt (): Date {
    return this.endAt
  }

  getkillDeathRatioLimit (): number {
    return this.killDeathRatioLimit
  }
}
