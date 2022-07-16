
import { Game } from '@/domain/entities/Game'
import { InvalidPreviosDateError } from '@/domain/errors/InvalidPreviosDateError'

export class Tournament {
  private readonly id: string
  private readonly startAt: Date
  private readonly endAt: Date
  private readonly registrationCoust: number
  private readonly killDeathRatioLimit: number
  private readonly game: Game

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
  }

  getPrize (): number {
    return 0
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
