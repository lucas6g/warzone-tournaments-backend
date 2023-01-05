import { Game } from '@/domain/entities/Game'

describe('Game', () => {
  it('should create a Game', () => {
    const sut = new Game('anyid', 'anyName', 'anyImage')

    expect(sut.getName()).toBe('anyName')
  })
})
