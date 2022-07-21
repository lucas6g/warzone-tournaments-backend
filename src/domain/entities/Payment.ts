import { PaymentStatus } from '@/domain/enums/PaymentStatus'

export class Payment {
  private readonly status: PaymentStatus
  constructor () {
    this.status = PaymentStatus.OPENED
  }

  getStatus (): PaymentStatus {
    return this.status
  }
}
