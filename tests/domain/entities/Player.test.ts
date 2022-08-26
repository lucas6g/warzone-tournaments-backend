import { Player } from '@/domain/entities/Player'

describe('Player', () => {
  let sut: Player

  beforeEach(() => {
    sut = new Player(
      'anyId',
      'anyEmail',
      'anyPassword',
      1.5,
      'anyPixkey',
      'anyGamerTag',
      'anyPlatForm'
    )
  })

  it('should create a player', () => {
    expect(sut.getKdLevel()).toBe(1.5)
  })
  it('should get player id', () => {
    expect(sut.getId()).toBe('anyId')
  })
})
