import Game from '@/domain/entities/Game'
import { Tournament } from '@/domain/entities/Tournament'

describe('Tournament', () => {
  it('should create a Tournament', () => {
    const startAt = new Date('2022-07-15T10:00:00')
    const endsAt = new Date('2022-07-15T12:00:00')
    const game = new Game('anyGameId', 'anyGameName', 'anyGameImage', 'anyGameType', 'anyGameMode')

    const sut = new Tournament('anyTournomentId', startAt, endsAt, 5, 1.5, game)

    expect(sut.getPrize()).toBe(0)
  })
  it('should create a Tournament with a game', () => {
    const startAt = new Date('2022-07-15T10:00:00')
    const endsAt = new Date('2022-07-15T12:00:00')
    const game = new Game('anyGameId', 'anyGameName', 'anyGameImage', 'anyGameType', 'anyGameMode')
    const sut = new Tournament('anyTournomentId', startAt, endsAt, 5, 1.5, game)

    expect(sut.getGame().getName()).toBe('anyGameName')
    expect(sut.getGame().getImage()).toBe('anyGameImage')
  })
})
