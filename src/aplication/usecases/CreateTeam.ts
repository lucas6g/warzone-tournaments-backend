import { CreateTeamError } from '@/aplication/errors/CreateTeamError'
import { FileStorage } from '@/aplication/protocols/gateways/FileStorage'
import { PlayerRepository } from '@/aplication/protocols/repositories/PlayerRepository'
import { UseCase } from '@/aplication/protocols/UseCase'

export class CreateTeam implements UseCase<Input, Output> {
  constructor (
    private readonly playerRepository: PlayerRepository,
    private readonly fileStorage: FileStorage
  ) {}

  async execute (input: Input): Promise<Output> {
    const player = await this.playerRepository.findById(input.playerId)

    if (player === undefined) {
      throw new CreateTeamError('player not found')
    }
    await this.fileStorage.upload(input.logo)
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
