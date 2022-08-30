import { PlayerRepository } from '@/aplication/protocols/repositories/PlayerRepository'
import { TeamInviteRepository } from '@/aplication/protocols/repositories/TeamInviteRepository'
import { AcceptTeamInvite } from '@/aplication/usecases/AcceptTeamInvite'
import { TeamInvite } from '@/domain/entities/TeamInvite'

import { mock, MockProxy } from 'jest-mock-extended'

describe('AcceptTeamInvite', () => {
  let teamInviteRepository: MockProxy<TeamInviteRepository>
  let playerRepository: MockProxy<PlayerRepository>
  let sut: AcceptTeamInvite

  beforeEach(() => {
    teamInviteRepository = mock<TeamInviteRepository>()
    playerRepository = mock<PlayerRepository>()
    sut = new AcceptTeamInvite(teamInviteRepository, playerRepository)

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
})
