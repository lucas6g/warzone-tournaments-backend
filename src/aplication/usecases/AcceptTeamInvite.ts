import { PlayerRepository } from '@/aplication/protocols/repositories/PlayerRepository'
import { TeamInviteRepository } from '@/aplication/protocols/repositories/TeamInviteRepository'
import { UseCase } from '@/aplication/protocols/UseCase'

export class AcceptTeamInvite implements UseCase<Input, Output> {
  constructor (
    private readonly teamInviteRepository: TeamInviteRepository,
    private readonly playerRepository: PlayerRepository
  ) {}

  async execute (input: Input): Promise<Output> {
    const teamInvite = await this.teamInviteRepository.findById(
      input.teamInviteId
    )
    await this.playerRepository.findById(String(teamInvite?.getPlayerId()))
    return await Promise.resolve({ status: 'accepted' })
  }
}

type Input = {
  teamInviteId: string
}

type Output = {
  status: string
}
