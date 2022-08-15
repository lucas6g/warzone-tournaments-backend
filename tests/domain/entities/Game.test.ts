import { Game } from '@/domain/entities/Game'
import { GameType } from '@/domain/enums/GameType'

describe('Game', () => {
  it('should create a Game', () => {
    const sut = new Game(
      'anyid',
      'anyName',
      GameType.TRIOS,
      'anyImage',
      'anyMode'
    )

    expect(sut.getGameType()).toBe(GameType.TRIOS)
  })
})
