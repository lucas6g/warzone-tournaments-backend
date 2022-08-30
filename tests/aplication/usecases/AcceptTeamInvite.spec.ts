import { TeamInviteRepository } from '@/aplication/protocols/repositories/TeamInviteRepository'
import { AcceptTeamInvite } from '@/aplication/usecases/AcceptTeamInvite'
import { mock, MockProxy } from 'jest-mock-extended'

describe('AcceptTeamInvite', () => {
  let teamInviteRepository: MockProxy<TeamInviteRepository>
  let sut: AcceptTeamInvite

  beforeEach(() => {
    teamInviteRepository = mock<TeamInviteRepository>()
    sut = new AcceptTeamInvite(teamInviteRepository)
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
})
