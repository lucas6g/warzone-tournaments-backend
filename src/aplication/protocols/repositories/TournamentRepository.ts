import { Tournament } from '@/domain/entities/Tournament'

export interface TournamentRepository {
  saveAll: (tournaments: Tournament[]) => Promise<void>
  findById: (id: string) => Promise<Tournament | undefined>
}
