import { Player } from '@/domain/entities/Player'

describe('Player', () => {
  let sut: Player

  beforeEach(() => {
    sut = new Player(
      'anyId',
      'anyEmail',
      'anyPassword',
      'anyPixkey',
      'anyGamerTag',
      'anyPlatForm'
    )
  })

  it('should create a player', () => {
    expect(sut.getId()).toBe('anyId')
  })
  it('should get player id', () => {
    expect(sut.getId()).toBe('anyId')
  })
})
