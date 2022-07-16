
import { InvalidDateError } from '@/domain/errors/InvalidStartAtDateAtError'

export class Tournament {
  private readonly id: string
  private readonly startAt: Date
  private readonly endAt: Date
  private readonly registrationCoust: number
  private readonly killDeathRatioLimit: number

  constructor (
    id: string,
    startAt: Date,
    endAt: Date,
    registrationCoust: number,
    killDeathRatioLimit: number

  ) {
    if (!this.isValidDate(startAt)) {
      throw new InvalidDateError('Invalid date')
    }
    this.id = id
    this.startAt = startAt
    this.endAt = endAt
    this.registrationCoust = registrationCoust
    this.killDeathRatioLimit = killDeathRatioLimit
  }

  getPrize (): number {
    return 0
  }

  isValidDate (date: Date, today: Date = new Date(Date.now())): boolean {
    if (date.getTime() < today.getTime()) {
      return false
    }
    return true
  }
}
