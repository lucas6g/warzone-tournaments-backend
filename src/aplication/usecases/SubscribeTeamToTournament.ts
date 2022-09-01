import { TournamentRepository } from '@/aplication/protocols/repositories/TournamentRepository'
import { UseCase } from '@/aplication/protocols/UseCase'

export class SubscribeTeamToTournament implements UseCase<Input, output> {
  constructor (private readonly tournamentRepository: TournamentRepository) {}

  async execute (input: Input): Promise<output> {
    await this.tournamentRepository.findById(input.tournamentId)
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
