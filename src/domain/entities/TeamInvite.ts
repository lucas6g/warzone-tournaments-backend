export class TeamInvite {
  private status: 'accepted' | 'not_accepted'
  constructor (
    private readonly id: string,
    private readonly teamId: string,
    private readonly playerId: string
  ) {
    this.status = 'not_accepted'
  }

  setStatus (status: 'accepted' | 'not_accepted'): void {
    this.status = status
  }

  getTeamId (): string {
    return this.teamId
  }

  getStatus (): string {
    return this.status
  }
}
