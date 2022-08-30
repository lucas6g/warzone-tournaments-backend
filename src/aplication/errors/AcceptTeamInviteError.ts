export class AcceptTeamInviteError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'AcceptTeamInviteError'
  }
}
