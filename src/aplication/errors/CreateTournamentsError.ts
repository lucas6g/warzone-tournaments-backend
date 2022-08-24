export class CreateTournamentsError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'CreateTournamentsError'
  }
}
