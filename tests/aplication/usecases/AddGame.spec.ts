import { AddGameError } from '@/aplication/errors/AddGameError'
import { FileStorage } from '@/aplication/protocols/FileStorage'
import { GameRepository } from '@/aplication/protocols/GameRepository'
import { IDGenerator } from '@/aplication/protocols/IDGenerator'
import { AddGame } from '@/aplication/usecases/AddGame'
import { Game } from '@/domain/entities/Game'

import { mock, MockProxy } from 'jest-mock-extended'

describe('AddGame', () => {
  let sut: AddGame
  let idGenerator: MockProxy<IDGenerator>
  let gameRepository: MockProxy<GameRepository>
  let fileStorage: MockProxy<FileStorage>

  beforeEach(() => {
    idGenerator = mock<IDGenerator>()
    gameRepository = mock<GameRepository>()
    fileStorage = mock<FileStorage>()
    sut = new AddGame(idGenerator, gameRepository, fileStorage)
    idGenerator.generate.mockReturnValue('anyId')
    fileStorage.upload.mockResolvedValue('imgUrl')
    gameRepository.getByName.mockResolvedValue(undefined)
  })

  it('should add a new game', async () => {
    const input = {
      fileName: 'anyFileName',
      name: 'warzone'
    }

    await sut.execute(input)
  })
  it('should call id generator', async () => {
    const input = {
      fileName: 'anyFileName',
      name: 'warzone'
    }

    await sut.execute(input)
    expect(idGenerator.generate).toHaveBeenCalledTimes(1)
  })
  it('should call GameRepository getByName method with correct parameters', async () => {
    const input = {
      fileName: 'anyFileName',
      name: 'warzone'
    }

    await sut.execute(input)
    expect(gameRepository.getByName).toHaveBeenCalledWith('warzone')
  })
  it('should throw AddGameError if game already exists', async () => {
    gameRepository.getByName.mockResolvedValueOnce(
      new Game('anyId', 'warzone', 'anyImage')
    )
    const input = {
      fileName: 'anyFileName',
      name: 'warzone'
    }

    await expect(sut.execute(input)).rejects.toThrow(
      new AddGameError('game with name warzone already exists')
    )
  })
  it('should call FileStorage upload method with correct parameters', async () => {
    const input = {
      fileName: 'anyFileName',
      name: 'warzone'
    }

    await sut.execute(input)

    expect(fileStorage.upload).toHaveBeenCalledWith('anyFileName')
  })
  it('should call GameRepository save method with correct game instance', async () => {
    const input = {
      fileName: 'anyFileName',
      name: 'warzone'
    }

    await sut.execute(input)

    expect(gameRepository.save).toHaveBeenCalledWith(
      new Game('anyId', 'warzone', 'imgUrl')
    )
  })
})
