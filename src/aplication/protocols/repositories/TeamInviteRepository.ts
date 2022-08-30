import { TeamInvite } from '@/domain/entities/TeamInvite'

export interface TeamInviteRepository {
  save: (teamInvite: TeamInvite) => Promise<void>
  findById: (id: string) => Promise<TeamInvite | undefined>
  delete: (teamInvite: TeamInvite) => Promise<void>
}
