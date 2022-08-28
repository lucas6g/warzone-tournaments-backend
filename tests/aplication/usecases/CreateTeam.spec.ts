import { CreateTeam } from '@/aplication/usecases/CreateTeam'

describe('CreateTeam', () => {
  it('should create a new Team', async () => {
    const sut = new CreateTeam()

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
})
