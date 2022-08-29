import { InvitePlayerToTeamError } from '@/aplication/errors/InvitePlayerToTeamError'
import { PlayerRepository } from '@/aplication/protocols/repositories/PlayerRepository'
import { TeamRepository } from '@/aplication/protocols/repositories/TeamRepository'
import { UseCase } from '@/aplication/protocols/UseCase'

export class InvitePlayerToTeam implements UseCase<Input> {
  constructor (
    private readonly teamRepository: TeamRepository,
    private readonly playerRepository: PlayerRepository
  ) {}

  async execute (input: Input): Promise<void> {
    await this.teamRepository.findById(input.teamId)
    const player = await this.playerRepository.findByGamertagAndPlatform(
      input.gamertag,
      input.platform
    )
    if (player === undefined) {
      throw new InvitePlayerToTeamError(
        `account with gamertag: ${input.gamertag} and platform: ${input.platform} was not found`
      )
    }
  }
}

type Input = {
  teamId: string
  gamertag: string
  platform: string
}
