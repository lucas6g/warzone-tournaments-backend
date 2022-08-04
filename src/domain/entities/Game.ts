import { GameType } from '@/domain/enums/GameType'

export class Game {
  constructor (
    private readonly id: string,
    private readonly name: string,
    private readonly gameType: GameType,
    private readonly image: string,
    private readonly mode: string
  ) {}

  getGameType (): GameType {
    return this.gameType
  }
}
