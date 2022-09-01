import { UseCase } from '@/aplication/protocols/UseCase'

export class SubscribeTeamToTournament implements UseCase<Input, output> {
  async execute (input: Input): Promise<output> {
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
