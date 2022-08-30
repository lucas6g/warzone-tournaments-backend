import { InvitePlayerToTeamError } from '@/aplication/errors/InvitePlayerToTeamError'
import { IDGenerator } from '@/aplication/protocols/IDGenerator'

import { PlayerRepository } from '@/aplication/protocols/repositories/PlayerRepository'
import { TeamInviteRepository } from '@/aplication/protocols/repositories/TeamInviteRepository'
import { TeamRepository } from '@/aplication/protocols/repositories/TeamRepository'
import { InvitePlayerToTeam } from '@/aplication/usecases/InvitePlayerToTeam'
import { Player } from '@/domain/entities/Player'
import { Team } from '@/domain/entities/Team'
import { TeamInvite } from '@/domain/entities/TeamInvite'

import { mock, MockProxy } from 'jest-mock-extended'

describe('InvitePlayerToTeam', () => {
  let teamRepository: MockProxy<TeamRepository>
  let idGenerator: MockProxy<IDGenerator>
  let teamInviteRepository: MockProxy<TeamInviteRepository>
  let playerRepository: MockProxy<PlayerRepository>
  let sut: InvitePlayerToTeam

  beforeEach(() => {
    teamRepository = mock<TeamRepository>()
    playerRepository = mock<PlayerRepository>()
    idGenerator = mock<IDGenerator>()
    teamInviteRepository = mock<TeamInviteRepository>()

    idGenerator.generate.mockReturnValue('teamInviteId')

    playerRepository.findByGamertagAndPlatform.mockResolvedValue(
      new Player(
        'playerId',
        'anyEmail@gmail.com',
        'anyPassword',
        'anyPixkey',
        'anygamertag',
        'anyplatform'
      )
    )

    teamRepository.findById.mockResolvedValueOnce(
      new Team(
        'anyTeamId',
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

    sut = new InvitePlayerToTeam(
      teamRepository,
      playerRepository,
      idGenerator,
      teamInviteRepository
    )
  })

  it('should invite a player to a team', async () => {
    const input = {
      teamId: 'anyTeamId',
      gamertag: 'anygamertag',
      platform: 'anyplatform'
    }

    await expect(sut.execute(input)).resolves.toBe(undefined)
  })
  it('should call TeamRepository findById method with correct teamId id', async () => {
    const input = {
      teamId: 'anyTeamId',
      gamertag: 'anygamertag',
      platform: 'anyplatform'
    }

    await sut.execute(input)

    expect(teamRepository.findById).toHaveBeenCalledWith('anyTeamId')
  })
  it('should throw InvitePlayerToTeamError if findByGamertagAndPlatform returns undefined', async () => {
    playerRepository.findByGamertagAndPlatform.mockResolvedValueOnce(undefined)
    const input = {
      teamId: 'anyTeamId',
      gamertag: 'anygamertag',
      platform: 'anyplatform'
    }

    await expect(sut.execute(input)).rejects.toThrow(
      new InvitePlayerToTeamError(
        'account with gamertag: anygamertag and platform: anyplatform was not found'
      )
    )
  })
  it('should call IdGenerator generate method ', async () => {
    const input = {
      teamId: 'anyTeamId',
      gamertag: 'anygamertag',
      platform: 'anyplatform'
    }
    await sut.execute(input)

    expect(idGenerator.generate).toHaveBeenCalledTimes(1)
  })
  it('should call TeamInviteRepository save method with TeamInvite instance', async () => {
    const input = {
      teamId: 'anyTeamId',
      gamertag: 'anygamertag',
      platform: 'anyplatform'
    }
    await sut.execute(input)
    expect(teamInviteRepository.save).toHaveBeenCalledWith(
      new TeamInvite('teamInviteId', 'anyTeamId', 'playerId')
    )
  })
})
