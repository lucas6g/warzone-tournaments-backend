import { Game } from '@/domain/entities/Game'
import { Team } from '@/domain/entities/Team'
import { TeamSubscription } from '@/domain/entities/TeamSubscription'
import { Tournament } from '@/domain/entities/Tournament'
import { GameType } from '@/domain/enums/GameType'

describe('TeamSubscription', () => {
  let sut: TeamSubscription
  let team: Team
  let tournament: Tournament

  beforeEach(() => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date('2022-07-15T14:00:00').getTime()
    })

    team = new Team('anyTeamId', 'anyTeamName', 'anyTeamLogo')
    tournament = new Tournament(
      'anyTournomentId',
      new Date('2022-07-15T17:00:00'),
      new Date('2022-07-15T19:00:00'),
      5,
      1.5,
      new Game(
        'anyGameId',
        'anyGameName',
        GameType.TRIOS,
        'anyGameImage',
        'anyGameMode'
      )
    )

    sut = new TeamSubscription(
      team,
      new Date('2022-07-15T14:00:00'),
      tournament
    )
  })

  it('should create a TeamSubscription', () => {
    const total = sut.calculateTotal(tournament.getRegistrationCoust())

    expect(sut.getTeam()).toEqual(team)
    expect(sut.getTournament()).toEqual(tournament)
    expect(total).toBe(15)
  })
})
