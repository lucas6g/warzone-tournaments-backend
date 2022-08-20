import { AddGameError } from '@/aplication/errors/AddGameError'
import { GameRepository } from '@/aplication/protocols/GameRepository'
import { IDGenerator } from '@/aplication/protocols/IDGenerator'
import { UseCase } from '@/aplication/protocols/UseCase'

export class AddGame implements UseCase<Input, Output> {
  constructor (
    private readonly idGenerator: IDGenerator,
    private readonly gameRepository: GameRepository
  ) {}

  async execute (input: Input): Promise<Output> {
    this.idGenerator.generate()
    const game = await this.gameRepository.getByName(input.name)
    if (game !== undefined) {
      throw new AddGameError(`game with name ${input.name} already exists`)
    }
    return await Promise.resolve({ status: 'created' })
  }
}

type Input = {
  name: string
}
type Output = {
  status: string
}
