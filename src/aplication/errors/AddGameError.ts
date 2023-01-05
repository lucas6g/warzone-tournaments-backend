export class AddGameError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'AddGameError'
  }
}
