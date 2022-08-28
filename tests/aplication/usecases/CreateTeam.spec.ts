import { PlayerRepository } from '@/aplication/protocols/repositories/PlayerRepository'
import { CreateTeam } from '@/aplication/usecases/CreateTeam'
import { mock, MockProxy } from 'jest-mock-extended'

describe('CreateTeam', () => {
  let sut: CreateTeam
  let playerRepository: MockProxy<PlayerRepository>
  beforeEach(() => {
    playerRepository = mock<PlayerRepository>()
    sut = new CreateTeam(playerRepository)
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
})
