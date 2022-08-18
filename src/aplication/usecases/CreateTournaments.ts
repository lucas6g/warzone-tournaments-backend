import { UseCase } from '@/aplication/protocols/UseCase'

export class CreateTournaments implements UseCase<Input[], Output> {
  async execute (input: Input[]): Promise<Output> {
    return await Promise.resolve({ status: 'created' })
  }
}

type Input = {
  startAt: Date
  endsAt: Date
  registrationCoust: number
  killDeathRatioLimit: number
  gameName: string
}
type Output = {
  status: string
}
