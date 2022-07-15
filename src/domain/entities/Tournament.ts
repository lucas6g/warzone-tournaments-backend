import Game from '@/domain/entities/Game'

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

  getGame (): Game {
    return this.game
  }
}
