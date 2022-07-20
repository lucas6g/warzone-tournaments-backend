import { GameType } from '@/domain/enums/GameType'

export class Game {
  private readonly id: string
  private readonly name: string
  private readonly gameType: GameType
  private readonly image: string
  private readonly mode: string

  constructor (
    id: string,
    name: string,
    gameType: GameType,
    image: string,
    mode: string
  ) {
    this.id = id
    this.name = name
    this.gameType = gameType
    this.image = image
    this.mode = mode
  }

  getGameType (): GameType {
    return this.gameType
  }
}
