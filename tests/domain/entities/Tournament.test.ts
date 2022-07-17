
import { Game } from '@/domain/entities/Game'
import { Team } from '@/domain/entities/Team'
import { Tournament } from '@/domain/entities/Tournament'
import { InvalidPreviosDateError } from '@/domain/errors/InvalidPreviosDateError'

describe('Tournament', () => {
  let sut: Tournament
  let game: Game
  let startAt: Date
  let endAt: Date

  beforeEach(() => {
    game = new Game('anyGameId', 'anyGameName', 'anyGameType', 'anyGameImage', 'anyGameMode')
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date('2022-07-15T14:00:00').getTime()
    })
    startAt = new Date('2022-07-15T17:00:00')
    endAt = new Date('2022-07-15T19:00:00')
    sut = new Tournament('anyTournomentId', startAt, endAt, 5, 1.5, game)
  })
  it('should create a Tournament with a game', () => {
    expect(sut.getPrize()).toBe(0)
    expect(sut.getGame()).toBeInstanceOf(Game)
  })

  it('should not create a Tournament with past startAt date', () => {
    const pastStartAtDate = new Date('2022-07-14T10:00:00')

    expect(() => new Tournament('anyTournomentId', pastStartAtDate, endAt, 5, 1.5, game)).toThrow(new InvalidPreviosDateError('Invalid previos date'))
  })

  it('should not create a Tournament with past endsAt date', () => {
    const pastEndAtDate = new Date('2022-07-14T17:00:00')

    expect(() => new Tournament('anyTournomentId', startAt, pastEndAtDate, 5, 1.5, game)).toThrow(new InvalidPreviosDateError('Invalid previos date'))
  })
  it('should subscribe a Team to a Tournament', () => {
    sut.subscribeTeam(new Team('anyTeamId', 'anyTeamName', 'anyTeamLogo'))

    expect(sut.getPrize()).toBe(15)
  })
})
