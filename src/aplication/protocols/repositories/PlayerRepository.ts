import { Player } from '@/domain/entities/Player'

export interface PlayerRepository {
  findByEmail: (email: string) => Promise<Player | undefined>
  save: (player: Player) => Promise<void>
  findById: (id: string) => Promise<Player | undefined>
  findByGamertagAndPlatform: (
    gamertag: string,
    platform: string
  ) => Promise<Player | undefined>
}
