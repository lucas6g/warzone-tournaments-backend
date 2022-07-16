
import { Tournament } from '@/domain/entities/Tournament'
import { InvalidDateError } from '@/domain/errors/InvalidStartAtDateAtError'

describe('Tournament', () => {
  it('should create a Tournament', () => {
    const startAt = new Date('2022-07-15T15:00:00')
    const endsAt = new Date('2022-07-15T17:00:00')

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date('2022-07-15T12:00:00').getTime()
    })
    const sut = new Tournament('anyTournomentId', startAt, endsAt, 5, 1.5)

    expect(sut.getPrize()).toBe(0)
  })

  it('should not create a Tournament whit invalid startAt date', () => {
    const startAt = new Date('2022-07-14T10:00:00')
    const endsAt = new Date('2022-07-15T17:00:00')

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date('2022-07-15T12:00:00').getTime()
    })
    expect(() => new Tournament('anyTournomentId', startAt, endsAt, 5, 1.5)).toThrow(new InvalidDateError('Invalid date'))
  })
})
