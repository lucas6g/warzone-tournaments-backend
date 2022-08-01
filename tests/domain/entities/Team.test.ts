import { Player } from '@/domain/entities/Player'
import { Team } from '@/domain/entities/Team'

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
        'anyGamerTag',
        'anyPlatForm'
      )
    )

    expect(sut.getId()).toBe('anyId')
    expect(sut.getLeaderId()).toBe('leaderId')
    expect(sut.getTotalPlayers()).toBe(1)
  })
  it('should add a Player to the Team', () => {
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
        'anyGamerTag',
        'anyPlatForm'
      )
    )
    sut.addPlayer(
      new Player(
        'leaderId',
        'anyName',
        'anyEmail',
        'anyPassword',
        1.2,
        'anyPixkey',
        'anyGamerTag',
        'anyPlatForm'
      )
    )

    expect(sut.getTotalPlayers()).toBe(2)
  })
})
