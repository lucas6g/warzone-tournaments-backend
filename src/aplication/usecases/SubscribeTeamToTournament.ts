import { TeamRepository } from '@/aplication/protocols/repositories/TeamRepository'
import { TournamentRepository } from '@/aplication/protocols/repositories/TournamentRepository'
import { UseCase } from '@/aplication/protocols/UseCase'

export class SubscribeTeamToTournament implements UseCase<Input, output> {
  constructor (
    private readonly tournamentRepository: TournamentRepository,
    private readonly teamRepository: TeamRepository
  ) {}

  async execute (input: Input): Promise<output> {
    await this.tournamentRepository.findById(input.tournamentId)
    await this.teamRepository.findById(input.teamId)
    return await Promise.resolve({ subscriptionPaymentStatus: 'PAID' })
  }
}

type Input = {
  teamId: string
  tournamentId: string
}

type output = {
  subscriptionPaymentStatus: string
}
