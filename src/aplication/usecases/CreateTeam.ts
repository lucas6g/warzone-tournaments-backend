import { CreateTeamError } from '@/aplication/errors/CreateTeamError'
import { FileStorage } from '@/aplication/protocols/gateways/FileStorage'
import { IDGenerator } from '@/aplication/protocols/IDGenerator'
import { PlayerRepository } from '@/aplication/protocols/repositories/PlayerRepository'
import { TeamRepository } from '@/aplication/protocols/repositories/TeamRepository'
import { UseCase } from '@/aplication/protocols/UseCase'
import { Team } from '@/domain/entities/Team'

export class CreateTeam implements UseCase<Input, Output> {
  constructor (
    private readonly playerRepository: PlayerRepository,
    private readonly fileStorage: FileStorage,
    private readonly idGenerator: IDGenerator,
    private readonly teamRepository: TeamRepository
  ) {}

  async execute (input: Input): Promise<Output> {
    const player = await this.playerRepository.findById(input.playerId)
    if (player === undefined) {
      throw new CreateTeamError('player not found')
    }
    const logoUrl = await this.fileStorage.upload(input.logo)
    const teamId = this.idGenerator.generate()
    const team = new Team(teamId, input.name, logoUrl, player.getId())
    await this.teamRepository.save(team)

    return {
      id: team.getId(),
      name: team.getName(),
      logo: team.getLogo(),
      playerId: team.getLeaderId()
    }
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
