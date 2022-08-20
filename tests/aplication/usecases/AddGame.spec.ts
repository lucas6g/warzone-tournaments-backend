import { AddGameError } from '@/aplication/errors/AddGameError'
import { GameRepository } from '@/aplication/protocols/GameRepository'
import { IDGenerator } from '@/aplication/protocols/IDGenerator'
import { AddGame } from '@/aplication/usecases/AddGame'
import { Game } from '@/domain/entities/Game'

import { mock, MockProxy } from 'jest-mock-extended'

describe('AddGame', () => {
  let idGenerator: MockProxy<IDGenerator>
  let gameRepository: MockProxy<GameRepository>

  beforeEach(() => {
    idGenerator = mock<IDGenerator>()
    gameRepository = mock<GameRepository>()

    gameRepository.getByName.mockResolvedValue(undefined)
  })

  it('should add a new game', async () => {
    const sut = new AddGame(idGenerator, gameRepository)

    const input = {
      name: 'warzone'
    }

    const output = await sut.execute(input)
    expect(output.status).toBe('created')
  })
  it('should call id generator', async () => {
    const sut = new AddGame(idGenerator, gameRepository)

    const input = {
      name: 'warzone'
    }

    await sut.execute(input)
    expect(idGenerator.generate).toHaveBeenCalledTimes(1)
  })
  it('should call GameRepository getByName method with correct parameters', async () => {
    const sut = new AddGame(idGenerator, gameRepository)

    const input = {
      name: 'warzone'
    }

    await sut.execute(input)
    expect(gameRepository.getByName).toHaveBeenCalledWith('warzone')
  })
  it('should throw AddGameError if game already exists', async () => {
    const sut = new AddGame(idGenerator, gameRepository)
    gameRepository.getByName.mockResolvedValueOnce(
      new Game('anyId', 'warzone', 'anyImage')
    )
    const input = {
      name: 'warzone'
    }

    await expect(sut.execute(input)).rejects.toThrow(
      new AddGameError('game with name warzone already exists')
    )
  })
})
