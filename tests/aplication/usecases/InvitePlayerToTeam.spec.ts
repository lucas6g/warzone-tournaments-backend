import { TeamRepository } from '@/aplication/protocols/repositories/TeamRepository'
import { InvitePlayerToTeam } from '@/aplication/usecases/InvitePlayerToTeam'
import { mock, MockProxy } from 'jest-mock-extended'

describe('InvitePlayerToTeam', () => {
  let teamRepository: MockProxy<TeamRepository>
  let sut: MockProxy<InvitePlayerToTeam>

  beforeEach(() => {
    teamRepository = mock<TeamRepository>()
    sut = mock<InvitePlayerToTeam>()
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
})
