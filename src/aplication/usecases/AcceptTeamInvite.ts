import { TeamInviteRepository } from '@/aplication/protocols/repositories/TeamInviteRepository'
import { UseCase } from '@/aplication/protocols/UseCase'

export class AcceptTeamInvite implements UseCase<Input, Output> {
  constructor (private readonly teamInviteRepository: TeamInviteRepository) {}

  async execute (input: Input): Promise<Output> {
    await this.teamInviteRepository.findById(input.teamInviteId)
    return await Promise.resolve({ status: 'accepted' })
  }
}

type Input = {
  teamInviteId: string
}

type Output = {
  status: string
}
