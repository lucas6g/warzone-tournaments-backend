import { Player } from '@/domain/entities/Player'
import { Team } from '@/domain/entities/Team'
import { PlayerRole } from '@/domain/enums/PlayerRole'

describe('Team', () => {
  it('should create a Team with a leader', () => {
    const sut = new Team(
      'anyId',
      'anyName',
      'anyLogo',
      new Player(
        'leaderId',
        'anyName',
        'anyEmail',
        'anyPassword',
        1.2,
        'anyPixkey',
        PlayerRole.LEADER,
        'anyGamerTag',
        'anyPlatForm'
      )
    )

    expect(sut.getId()).toBe('anyId')
    expect(sut.getLeaderId()).toBe('leaderId')
    expect(sut.getTotalPlayers()).toBe(1)
  })
})
