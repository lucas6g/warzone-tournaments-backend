export class RegisterPlayerError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'RegisterPlayerError'
  }
}
