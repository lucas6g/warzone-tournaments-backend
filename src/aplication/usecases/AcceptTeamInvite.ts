import { UseCase } from '@/aplication/protocols/UseCase'

export class AcceptTeamInvite implements UseCase<Input, Output> {
  async execute (input: Input): Promise<Output> {
    return await Promise.resolve({ status: 'accepted' })
  }
}

type Input = {
  teamInviteId: string
}

type Output = {
  status: string
}
