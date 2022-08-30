import { TeamInvite } from '@/domain/entities/TeamInvite'

export interface TeamInviteRepository {
  save: (teamInvite: TeamInvite) => Promise<void>
}
