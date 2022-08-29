import { TeamRepository } from '@/aplication/protocols/repositories/TeamRepository'
import { UseCase } from '@/aplication/protocols/UseCase'

export class InvitePlayerToTeam implements UseCase<Input> {
  constructor (private readonly teamRepository: TeamRepository) {}

  async execute (input: Input): Promise<void> {
    await this.teamRepository.findById(input.teamId)
  }
}

type Input = {
  teamId: string
  gamertag: string
  platform: string
}
