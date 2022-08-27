import { Player } from '@/domain/entities/Player'

export interface PlayerRepository {
  findByEmail: (email: string) => Promise<Player | undefined>
  save: (player: Player) => Promise<void>
}
