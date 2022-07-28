import { Team } from '@/domain/entities/Team'

describe('Team', () => {
  it('should create a Team', () => {
    const sut = new Team('anyId', 'anyName', 'anyLogo')

    expect(sut.getId()).toBe('anyId')
  })
})
