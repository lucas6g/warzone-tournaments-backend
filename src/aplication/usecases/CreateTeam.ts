import { UseCase } from '@/aplication/protocols/UseCase'

export class CreateTeam implements UseCase<Input, Output> {
  async execute (input: Input): Promise<Output> {
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
