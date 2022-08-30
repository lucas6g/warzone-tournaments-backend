import { PlayerRepository } from '@/aplication/protocols/repositories/PlayerRepository'
import { TeamInviteRepository } from '@/aplication/protocols/repositories/TeamInviteRepository'
import { TeamRepository } from '@/aplication/protocols/repositories/TeamRepository'
import { AcceptTeamInvite } from '@/aplication/usecases/AcceptTeamInvite'
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
})
