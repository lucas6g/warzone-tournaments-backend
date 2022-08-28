import { CreateTeamError } from '@/aplication/errors/CreateTeamError'
import { FileStorage } from '@/aplication/protocols/gateways/FileStorage'
import { IDGenerator } from '@/aplication/protocols/IDGenerator'
import { PlayerRepository } from '@/aplication/protocols/repositories/PlayerRepository'
import { CreateTeam } from '@/aplication/usecases/CreateTeam'
import { Player } from '@/domain/entities/Player'
import { mock, MockProxy } from 'jest-mock-extended'

describe('CreateTeam', () => {
  let sut: CreateTeam
  let playerRepository: MockProxy<PlayerRepository>
  let fileStorage: MockProxy<FileStorage>
  let idGenerator: MockProxy<IDGenerator>
  beforeEach(() => {
    playerRepository = mock<PlayerRepository>()
    fileStorage = mock<FileStorage>()
    idGenerator = mock<IDGenerator>()
    sut = new CreateTeam(playerRepository, fileStorage, idGenerator)

    playerRepository.findById.mockResolvedValue(
      new Player(
        'anyId',
        'anyEmail@gmail.com',
        'hashedPassword',
        'anyPixkey',
        'anyGamerTag',
        'anyPlatForm'
      )
    )
  })

  it('should create a new Team', async () => {
    const input = {
      playerId: 'anyPlayerId',
      name: 'anyTeamName',
      logo: 'anyTeamLogo'
    }

    const output = await sut.execute(input)

    expect(output).toEqual({
      id: 'anyTeamid',
      name: 'anyTeamName',
      logo: 'anyTeamLogo',
      playerId: 'anyPlayerId'
    })
  })
  it('should call a PlayerRepository findById method with correct playerId', async () => {
    const input = {
      playerId: 'anyPlayerId',
      name: 'anyTeamName',
      logo: 'anyTeamLogo'
    }

    await sut.execute(input)

    expect(playerRepository.findById).toHaveBeenCalledWith('anyPlayerId')
  })
  it('should throw CreateTeamError if player with given id was not found', async () => {
    playerRepository.findById.mockResolvedValueOnce(undefined)
    const input = {
      playerId: 'anyPlayerId',
      name: 'anyTeamName',
      logo: 'anyTeamLogo'
    }

    await expect(sut.execute(input)).rejects.toThrow(
      new CreateTeamError('player not found')
    )
  })
  it('should call FileStorage upload method with  correct logo filename', async () => {
    const input = {
      playerId: 'anyPlayerId',
      name: 'anyTeamName',
      logo: 'anyTeamLogo'
    }

    await sut.execute(input)

    expect(fileStorage.upload).toHaveBeenCalledWith('anyTeamLogo')
  })
  it('should call IDGenerator generate method', async () => {
    const input = {
      playerId: 'anyPlayerId',
      name: 'anyTeamName',
      logo: 'anyTeamLogo'
    }

    await sut.execute(input)

    expect(idGenerator.generate).toHaveBeenCalledTimes(1)
  })
})
