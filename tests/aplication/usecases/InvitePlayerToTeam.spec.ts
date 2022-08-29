import { InvitePlayerToTeam } from '@/aplication/usecases/InvitePlayerToTeam'

describe('InvitePlayerToTeam', () => {
  it('should invite a player to a team', async () => {
    const sut = new InvitePlayerToTeam()

    const input = {
      leaderId: 'anyPlayerId',
      teamId: 'anyTeamId',
      gamertag: 'anygamertag',
      platform: 'anyplatform'
    }

    await expect(sut.execute(input)).resolves.toBe(undefined)
  })
})
