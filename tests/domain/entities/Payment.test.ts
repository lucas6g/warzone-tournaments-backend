import { Payment } from '@/domain/entities/Payment'

describe('Payment', () => {
  it('should create a payment instance', () => {
    const sut = new Payment(
      'anyId',
      15,
      new Date('2022-07-15T17:00:00'),
      'payerId'
    )

    expect(sut.getStatus()).toBe('OPEN')
  })
})
