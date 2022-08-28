import { CreateTeamError } from '@/aplication/errors/CreateTeamError'
import { FileStorage } from '@/aplication/protocols/gateways/FileStorage'
import { IDGenerator } from '@/aplication/protocols/IDGenerator'
import { PlayerRepository } from '@/aplication/protocols/repositories/PlayerRepository'
import { TeamRepository } from '@/aplication/protocols/repositories/TeamRepository'
import { CreateTeam } from '@/aplication/usecases/CreateTeam'
import { Player } from '@/domain/entities/Player'
import { Team } from '@/domain/entities/Team'
import { mock, MockProxy } from 'jest-mock-extended'

describe('CreateTeam', () => {
  let sut: CreateTeam
  let playerRepository: MockProxy<PlayerRepository>
  let fileStorage: MockProxy<FileStorage>
  let idGenerator: MockProxy<IDGenerator>
  let teamRepository: MockProxy<TeamRepository>
  beforeEach(() => {
    playerRepository = mock<PlayerRepository>()
    fileStorage = mock<FileStorage>()
    idGenerator = mock<IDGenerator>()
    teamRepository = mock<TeamRepository>()
    sut = new CreateTeam(
      playerRepository,
      fileStorage,
      idGenerator,
      teamRepository
    )

    playerRepository.findById.mockResolvedValue(
      new Player(
        'anyPlayerId',
        'anyEmail@gmail.com',
        'hashedPassword',
        'anyPixkey',
        'anyGamerTag',
        'anyPlatForm'
      )
    )

    idGenerator.generate.mockReturnValue('anyId')
    fileStorage.upload.mockResolvedValue('logoUrl')
  })

  it('should create a new Team', async () => {
    const input = {
      playerId: 'anyPlayerId',
      name: 'anyTeamName',
      logo: 'anyTeamLogo'
    }

    const output = await sut.execute(input)

    expect(output).toEqual({
      id: 'anyId',
      name: 'anyTeamName',
      logo: 'logoUrl',
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
  it('should call TeamRepository save method with correct team instance', async () => {
    const input = {
      playerId: 'anyPlayerId',
      name: 'anyTeamName',
      logo: 'anyTeamLogo'
    }

    await sut.execute(input)

    expect(teamRepository.save).toHaveBeenCalledWith(
      new Team(
        'anyId',
        'anyTeamName',
        'logoUrl',
        new Player(
          'anyPlayerId',
          'anyEmail@gmail.com',
          'hashedPassword',
          'anyPixkey',
          'anyGamerTag',
          'anyPlatForm'
        )
      )
    )
  })
})
