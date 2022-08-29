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
    await this.playerRepository.findByGamertagAndPlatform(
      input.gamertag,
      input.platform
    )
  }
}

type Input = {
  teamId: string
  gamertag: string
  platform: string
}
