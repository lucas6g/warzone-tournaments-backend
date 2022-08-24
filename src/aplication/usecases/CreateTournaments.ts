import { GameRepository } from '@/aplication/protocols/GameRepository'
import { UseCase } from '@/aplication/protocols/UseCase'

export class CreateTournaments implements UseCase<Input[]> {
  constructor (private readonly gameRepository: GameRepository) {}

  async execute (input: Input[]): Promise<void> {
    const gameNames = input.map(input => {
      return input.gameName
    })
    const uniqueGameNames = [...new Set(gameNames)]
    await this.gameRepository.findByGivenNames(uniqueGameNames)

    return await Promise.resolve()
  }
}

export type Input = {
  startAt: Date
  endsAt: Date
  registrationCoust: number
  killDeathRatioLimit: number
  description: string
  mode: string
  type: number
  gameName: string
}
