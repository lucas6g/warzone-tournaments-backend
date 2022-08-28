import { PlayerRepository } from '@/aplication/protocols/repositories/PlayerRepository'
import { UseCase } from '@/aplication/protocols/UseCase'

export class CreateTeam implements UseCase<Input, Output> {
  constructor (private readonly playerRepository: PlayerRepository) {}

  async execute (input: Input): Promise<Output> {
    await this.playerRepository.findById(input.playerId)
    return await Promise.resolve({
      id: 'anyTeamid',
      name: 'anyTeamName',
      logo: 'anyTeamLogo',
      playerId: 'anyPlayerId'
    })
  }
}

type Input = {
  playerId: string
  name: string
  logo: string
}

type Output = {
  id: string
  name: string
  logo: string
  playerId: string
}
