import { Tournament } from '@/main/domain/entities/Tournament'

describe('Tournament', () => {
  it('should create a Tournament', () => {
    const startAt = new Date('2022-07-15T10:00:00')
    const endsAt = new Date('2022-07-15T12:00:00')

    const sut = new Tournament('anyTournomentId', startAt, endsAt, 5, 1.5)

    expect(sut.getPrize()).toBe(0)
  })
})
