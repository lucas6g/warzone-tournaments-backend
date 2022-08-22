import { Game } from '@/domain/entities/Game'

export interface GameRepository {
  getByName: (name: string) => Promise<Game | undefined>
  save: (game: Game) => Promise<void>
}
