import { PaymentStatus } from '@/domain/enums/PaymentStatus'

export class Payment {
  private readonly status: PaymentStatus
  constructor (
    private readonly id: string,
    private readonly amount: number,
    private readonly date: Date,
    private readonly payerId: string
  ) {
    this.status = PaymentStatus.OPEN
  }

  getStatus (): PaymentStatus {
    return this.status
  }
}
