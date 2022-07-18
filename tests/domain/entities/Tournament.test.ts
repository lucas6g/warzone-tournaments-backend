
import { Game } from '@/domain/entities/Game'
import { Team } from '@/domain/entities/Team'
import { Tournament } from '@/domain/entities/Tournament'
import { GameType } from '@/domain/enums/GameType'
import { InvalidPreviosDateError } from '@/domain/errors/InvalidPreviosDateError'
import { TournamentError } from '@/domain/errors/TournamentError'

describe('Tournament', () => {
  let sut: Tournament
  let game: Game
  let startAt: Date
  let endAt: Date
  let team: Team

  beforeEach(() => {
    game = new Game('anyGameId', 'anyGameName', GameType.TRIOS, 'anyGameImage', 'anyGameMode')
    team = new Team('anyTeamId', 'anyTeamName', 'anyTeamLogo')
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
    sut.subscribeTeam(team)

    expect(sut.getPrize()).toBe(15)
  })
  it('should not subscribe a Team to a Tournament if number of players is different from the type of game', () => {
    jest.spyOn(team, 'getTotalPlayers').mockReturnValueOnce(4)

    expect(() => sut.subscribeTeam(team)).toThrow(new TournamentError('number of team players is different from the type of game'))
  })
  it('should not subscribe a Team to a Tournament during the Tournament period', () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date('2022-07-15T17:15:00').getTime()
    })
    expect(() => sut.subscribeTeam(team)).toThrow(new TournamentError('subscription denied tournament is already in progress'))
  })
})
