import { InvitePlayerToTeamError } from '@/aplication/errors/InvitePlayerToTeamError'
import { IDGenerator } from '@/aplication/protocols/IDGenerator'
import { PlayerRepository } from '@/aplication/protocols/repositories/PlayerRepository'
import { TeamInviteRepository } from '@/aplication/protocols/repositories/TeamInviteRepository'
import { TeamRepository } from '@/aplication/protocols/repositories/TeamRepository'
import { UseCase } from '@/aplication/protocols/UseCase'
import { TeamInvite } from '@/domain/entities/TeamInvite'

export class InvitePlayerToTeam implements UseCase<Input> {
  constructor (
    private readonly teamRepository: TeamRepository,
    private readonly playerRepository: PlayerRepository,
    private readonly idGenerator: IDGenerator,
    private readonly teamInviteRepository: TeamInviteRepository
  ) {}

  async execute (input: Input): Promise<void> {
    const team = await this.teamRepository.findById(input.teamId)

    const player = await this.playerRepository.findByGamertagAndPlatform(
      input.gamertag,
      input.platform
    )
    if (player === undefined) {
      throw new InvitePlayerToTeamError(
        `account with gamertag: ${input.gamertag} and platform: ${input.platform} was not found`
      )
    }

    const inviteId = this.idGenerator.generate()

    await this.teamInviteRepository.save(
      new TeamInvite(inviteId, String(team?.getId()), player.getId())
    )
  }
}

type Input = {
  teamId: string
  gamertag: string
  platform: string
}
