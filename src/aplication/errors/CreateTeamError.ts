export class CreateTeamError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'CreateTeamError'
  }
}
