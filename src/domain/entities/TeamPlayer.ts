import { PlayerRole } from '@/domain/enums/PlayerRole'

export class TeamPlayer {
  private kdLevel: number = 0
  constructor (
    private readonly playerId: string,
    private readonly teamId: string,
    private readonly role: PlayerRole
  ) {}

  setKdLevel (kdLevel: number): void {
    this.kdLevel = kdLevel
  }

  getKdLevel (): number {
    return this.kdLevel
  }
}
