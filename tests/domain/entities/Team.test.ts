import { Player } from '@/domain/entities/Player'
import { Team } from '@/domain/entities/Team'
import { PlayerRole } from '@/domain/enums/PlayerRole'

describe('Team', () => {
  it('should create a Team', () => {
    const sut = new Team('anyId', 'anyName', 'anyLogo', 'playerId')

    expect(sut.getId()).toBe('anyId')
    expect(sut.getPlayerId()).toBe('playerId')
  })
  it('should add a Player to a Team', () => {
    const sut = new Team('anyId', 'anyName', 'anyLogo', 'playerId')

    sut.addPlayer(
      new Player(
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
    )

    expect(sut.getTotalPlayers()).toBe(1)
  })
  it('should return all players inside a Team', () => {
    const sut = new Team('anyId', 'anyName', 'anyLogo', 'playerId')

    sut.addPlayer(
      new Player(
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
    )

    expect(sut.getPlayers()).toEqual([
      {
        id: 'anyId',
        name: 'anyName',
        email: 'anyEmail',
        password: 'anyPassword',
        kdLevel: 1.5,
        pixKey: 'anyPixkey',
        playerRole: 'COMMON',
        gamerTag: 'anyGamerTag',
        platForm: 'anyPlatForm'
      }
    ])
  })
})
