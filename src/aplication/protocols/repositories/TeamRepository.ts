import { Team } from '@/domain/entities/Team'

export interface TeamRepository {
  save: (team: Team) => Promise<void>
  findById: (id: string) => Promise<Team | undefined>
}
