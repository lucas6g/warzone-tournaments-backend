import { TeamInviteRepository } from '@/aplication/protocols/repositories/TeamInviteRepository'
import { AcceptTeamInvite } from '@/aplication/usecases/AcceptTeamInvite'
import { mock, MockProxy } from 'jest-mock-extended'

describe('AcceptTeamInvite', () => {
  let teamInviteRepository: MockProxy<TeamInviteRepository>

  beforeEach(() => {
    teamInviteRepository = mock<TeamInviteRepository>()
  })

  it('should accepte team invite', async () => {
    const sut = new AcceptTeamInvite(teamInviteRepository)

    const input = {
      teamInviteId: 'anyId'
    }

    const output = await sut.execute(input)

    expect(output.status).toBe('accepted')
  })
  it('should call TeamInviteRepository findById method with correct teamInviteId', async () => {
    const sut = new AcceptTeamInvite(teamInviteRepository)

    const input = {
      teamInviteId: 'anyTeamInviteId'
    }

    await sut.execute(input)

    expect(teamInviteRepository.findById).toHaveBeenCalledWith(
      'anyTeamInviteId'
    )
  })
})
