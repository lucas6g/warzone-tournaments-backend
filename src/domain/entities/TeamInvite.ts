export class TeamInvite {
  private readonly status: 'accepted' | 'not_accepted'
  constructor (
    private readonly id: string,
    private readonly teamId: string,
    private readonly playerId: string
  ) {
    this.status = 'not_accepted'
  }

  getTeamId (): string {
    return this.teamId
  }

  getStatus (): string {
    return this.status
  }
}
