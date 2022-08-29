export class InvitePlayerToTeamError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'InvitePlayerToTeamError'
  }
}
