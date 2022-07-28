import { Player } from '@/domain/entities/Player'
import { PlayerRole } from '@/domain/enums/PlayerRole'

describe('Player', () => {
  it('should create a player', () => {
    const sut = new Player(
      'anyId',
      'anyName',
      'anyEmail',
      'anyPassword',
      1.5,
      'anyPixkey',
      PlayerRole.COMMON,
      'anyGamerTag',
      'anyPlatForm'
    )

    expect(sut.getKdLevel()).toBe(1.5)
    expect(sut.getName()).toBe('anyName')
  })
})
