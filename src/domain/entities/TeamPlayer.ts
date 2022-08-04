import { Player } from '@/domain/entities/Player'
import { PlayerRole } from '@/domain/enums/PlayerRole'

export class TeamPlayer {
  constructor (
    private readonly player: Player,
    private readonly teamId: string,
    private readonly role: PlayerRole
  ) {}

  getPlayerKdLevel (): number {
    return this.player.getKdLevel()
  }
}
