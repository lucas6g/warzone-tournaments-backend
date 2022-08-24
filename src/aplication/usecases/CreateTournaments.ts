import { UseCase } from '@/aplication/protocols/UseCase'

export class CreateTournaments implements UseCase<Input[]> {
  async execute (input: Input[]): Promise<void> {
    return await Promise.resolve()
  }
}

type Input = {
  startAt: Date
  endsAt: Date
  registrationCoust: number
  killDeathRatioLimit: number
  description: string
  mode: string
  type: number
  gameName: string
}
