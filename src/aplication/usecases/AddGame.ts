import { AddGameError } from '@/aplication/errors/AddGameError'
import { FileStorage } from '@/aplication/protocols/gateways/FileStorage'

import { IDGenerator } from '@/aplication/protocols/IDGenerator'
import { GameRepository } from '@/aplication/protocols/repositories/GameRepository'
import { UseCase } from '@/aplication/protocols/UseCase'
import { Game } from '@/domain/entities/Game'

export class AddGame implements UseCase<Input> {
  constructor (
    private readonly idGenerator: IDGenerator,
    private readonly gameRepository: GameRepository,
    private readonly fileStorage: FileStorage
  ) {}

  async execute (input: Input): Promise<void> {
    const game = await this.gameRepository.getByName(input.name)
    if (game !== undefined) {
      throw new AddGameError(`game with name ${input.name} already exists`)
    }
    const id = this.idGenerator.generate()
    const imgUrl = await this.fileStorage.upload(input.fileName)
    await this.gameRepository.save(new Game(id, input.name, imgUrl))
  }
}

type Input = {
  fileName: string
  name: string
}
