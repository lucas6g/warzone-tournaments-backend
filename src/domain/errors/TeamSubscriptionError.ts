export class TeamSubscriptionError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'TeamSubscriptionError'
  }
}
