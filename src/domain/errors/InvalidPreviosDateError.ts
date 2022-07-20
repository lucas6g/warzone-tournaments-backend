export class InvalidPreviosDateError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'InvalidPreviosDateError'
  }
}
