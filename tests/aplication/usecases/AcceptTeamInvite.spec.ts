import { AcceptTeamInviteError } from '@/aplication/errors/AcceptTeamInviteError'
import { PlayerRepository } from '@/aplication/protocols/repositories/PlayerRepository'
import { TeamInviteRepository } from '@/aplication/protocols/repositories/TeamInviteRepository'
import { TeamRepository } from '@/aplication/protocols/repositories/TeamRepository'
import { AcceptTeamInvite } from '@/aplication/usecases/AcceptTeamInvite'
import { Player } from '@/domain/entities/Player'
import { Team } from '@/domain/entities/Team'
import { TeamInvite } from '@/domain/entities/TeamInvite'

import { mock, MockProxy } from 'jest-mock-extended'

describe('AcceptTeamInvite', () => {
  let teamInviteRepository: MockProxy<TeamInviteRepository>
  let playerRepository: MockProxy<PlayerRepository>
  let teamRepository: MockProxy<TeamRepository>
  let sut: AcceptTeamInvite

  beforeEach(() => {
    teamInviteRepository = mock<TeamInviteRepository>()
    playerRepository = mock<PlayerRepository>()
    teamRepository = mock<TeamRepository>()
    sut = new AcceptTeamInvite(
      teamInviteRepository,
      playerRepository,
      teamRepository
    )

    teamInviteRepository.findById.mockResolvedValue(
      new TeamInvite('anyTeamInviteId', 'anyTeamId', 'anyPlayerId')
    )

    teamRepository.findById.mockResolvedValue(
      new Team('anyId', 'anyTeamName', 'logoUrl', 'anyPlayerId')
    )
    playerRepository.findById.mockResolvedValue(
      new Player(
        'anyId',
        'anyEmail@gmail.com',
        'anyPassword',
        'anyPixkey',
        'anyGamerTag',
        'anyPlatForm'
      )
    )
  })

  it('should accepte team invite', async () => {
    const input = {
      teamInviteId: 'anyId'
    }

    const output = await sut.execute(input)

    expect(output.status).toBe('accepted')
  })
  it('should call TeamInviteRepository findById method with correct teamInviteId', async () => {
    const input = {
      teamInviteId: 'anyTeamInviteId'
    }

    await sut.execute(input)

    expect(teamInviteRepository.findById).toHaveBeenCalledWith(
      'anyTeamInviteId'
    )
  })
  it('should trown  AcceptTeamInviteError if TeamInviteRepository findById method returns undefined', async () => {
    teamInviteRepository.findById.mockResolvedValueOnce(undefined)

    const input = {
      teamInviteId: 'anyTeamInviteId'
    }

    await expect(sut.execute(input)).rejects.toThrow(
      new AcceptTeamInviteError('TeamInvite not found')
    )
  })
  it('should call PlayerRepository findById method with correct playerId', async () => {
    const input = {
      teamInviteId: 'anyTeamInviteId'
    }

    await sut.execute(input)

    expect(playerRepository.findById).toHaveBeenCalledWith('anyPlayerId')
  })
  it('should call TeamRepository  findById method with correct teamId', async () => {
    const input = {
      teamInviteId: 'anyTeamInviteId'
    }

    await sut.execute(input)

    expect(teamRepository.findById).toHaveBeenCalledWith('anyTeamId')
  })
  it('should call TeamInviteRepository delete method with correct teamInviteInstace', async () => {
    const input = {
      teamInviteId: 'anyTeamInviteId'
    }

    await sut.execute(input)

    expect(teamInviteRepository.delete).toHaveBeenCalledWith({
      id: 'anyTeamInviteId',
      playerId: 'anyPlayerId',
      status: 'accepted',
      teamId: 'anyTeamId'
    })
  })
  it('should call TeamRepository save method with correct team instance', async () => {
    const input = {
      teamInviteId: 'anyTeamInviteId'
    }

    await sut.execute(input)

    expect(teamRepository.save).toHaveBeenCalledWith({
      id: 'anyId',
      name: 'anyTeamName',
      logo: 'logoUrl',
      leaderId: 'anyPlayerId',
      teamPlayers: [
        {
          playerId: 'anyPlayerId',
          teamId: 'anyId',
          role: 'LEADER',
          kdLevel: 0
        },
        {
          playerId: 'anyId',
          teamId: 'anyId',
          role: 'COMMON',
          kdLevel: 0
        }
      ],
      tournamentScores: []
    })
  })
})
