import { UseCase } from '@/aplication/protocols/UseCase'

export class InvitePlayerToTeam implements UseCase<Input> {
  async execute (input: Input): Promise<void> {}
}

type Input = {
  leaderId: string
  teamId: string
  gamertag: string
  platform: string
}
