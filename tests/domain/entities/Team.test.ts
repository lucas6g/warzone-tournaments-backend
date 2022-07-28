import { Team } from '@/domain/entities/Team'

describe('Team', () => {
  it('should create a Team', () => {
    const sut = new Team('anyId', 'anyName', 'anyLogo', 'playerId')

    expect(sut.getId()).toBe('anyId')
    expect(sut.getPlayerId()).toBe('playerId')
  })
})
