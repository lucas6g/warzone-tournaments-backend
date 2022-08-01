import { Player } from '@/domain/entities/Player'
import { Team } from '@/domain/entities/Team'

describe('Team', () => {
  let sut: Team

  beforeEach(() => {
    sut = new Team(
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
  })

  it('should create a Team with a leader', () => {
    expect(sut.getId()).toBe('anyId')
    expect(sut.getLeaderId()).toBe('leaderId')
    expect(sut.getTotalPlayers()).toBe(1)
  })
  it('should add a Player to the Team', () => {
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
