import { PlayerRole } from '@/domain/enums/PlayerRole'

export class TeamPlayer {
  constructor (
    private readonly playerId: string,
    private readonly teamId: string,
    private readonly role: PlayerRole,
    private readonly kdLevel?: number
  ) {}

  getKdLevel (): number {
    return Number(this.kdLevel)
  }
}
