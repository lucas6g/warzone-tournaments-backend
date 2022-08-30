import { TeamInvite } from '@/domain/entities/TeamInvite'

describe('TeamInvite', () => {
  it('should create a new TeamInvite instance', () => {
    const sut = new TeamInvite('anyId', 'teamId', 'playerId')

    expect(sut.getTeamId()).toBe('teamId')
    expect(sut.getStatus()).toBe('not_accepted')
  })
})
