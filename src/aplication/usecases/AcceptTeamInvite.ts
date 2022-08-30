import { AcceptTeamInviteError } from '@/aplication/errors/AcceptTeamInviteError'
import { PlayerRepository } from '@/aplication/protocols/repositories/PlayerRepository'
import { TeamInviteRepository } from '@/aplication/protocols/repositories/TeamInviteRepository'
import { TeamRepository } from '@/aplication/protocols/repositories/TeamRepository'
import { UseCase } from '@/aplication/protocols/UseCase'

export class AcceptTeamInvite implements UseCase<Input, Output> {
  constructor (
    private readonly teamInviteRepository: TeamInviteRepository,
    private readonly playerRepository: PlayerRepository,
    private readonly teamRepository: TeamRepository
  ) {}

  async execute (input: Input): Promise<Output> {
    const teamInvite = await this.teamInviteRepository.findById(
      input.teamInviteId
    )

    if (teamInvite === undefined) {
      throw new AcceptTeamInviteError('TeamInvite not found')
    }

    const player = await this.playerRepository.findById(
      teamInvite.getPlayerId()
    )
    const team = await this.teamRepository.findById(teamInvite.getTeamId())
    teamInvite.setStatus('accepted')
    if (player !== undefined) {
      team?.addPlayer(player)
    }
    await this.teamInviteRepository.delete(teamInvite)

    return {
      status: teamInvite?.getStatus()
    }
  }
}

type Input = {
  teamInviteId: string
}

type Output = {
  status: string
}
