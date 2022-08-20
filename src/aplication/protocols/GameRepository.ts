import { Game } from '@/domain/entities/Game'

export interface GameRepository {
  getByName: (name: string) => Game
}
