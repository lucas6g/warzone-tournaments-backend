
import { Game } from '@/domain/entities/Game'
import { Tournament } from '@/domain/entities/Tournament'
import { InvalidPreviosDateError } from '@/domain/errors/InvalidPreviosDateError'

describe('Tournament', () => {
  it('should create a Tournament with a game', () => {
    const startAt = new Date('2022-07-15T17:00:00')
    const endsAt = new Date('2022-07-15T19:00:00')

    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date('2022-07-15T14:00:00').getTime()
    })

    const game = new Game('anyGameId', 'anyGameName', 'anyGameType', 'anyGameImage', 'anyGameMode')
    const sut = new Tournament('anyTournomentId', startAt, endsAt, 5, 1.5, game)

    expect(sut.getPrize()).toBe(0)
    expect(sut.getGame()).toBeInstanceOf(Game)
  })

  it('should not create a Tournament whit invalid startAt date', () => {
    const startAt = new Date('2022-07-14T10:00:00')
    const endsAt = new Date('2022-07-15T17:00:00')

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date('2022-07-15T14:00:00').getTime()
    })
    const game = new Game('anyGameId', 'anyGameName', 'anyGameType', 'anyGameImage', 'anyGameMode')

    expect(() => new Tournament('anyTournomentId', startAt, endsAt, 5, 1.5, game)).toThrow(new InvalidPreviosDateError('Invalid previos date'))
  })

  it('should not create a Tournament with invalid endsAt date', () => {
    const startAt = new Date('2022-07-15T15:00:00')
    const endsAt = new Date('2022-07-14T17:00:00')

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date('2022-07-15T14:00:00').getTime()
    })
    const game = new Game('anyGameId', 'anyGameName', 'anyGameType', 'anyGameImage', 'anyGameMode')
    expect(() => new Tournament('anyTournomentId', startAt, endsAt, 5, 1.5, game)).toThrow(new InvalidPreviosDateError('Invalid previos date'))
  })
})
