import { SubscribeTeamToTournament } from '@/aplication/usecases/SubscribeTeamToTournament'

describe('SubscribeTeamToTournament', () => {
  it('should subscribe a Team to a Tournament', async () => {
    const sut = new SubscribeTeamToTournament()

    const input = {
      teamId: 'anyTeamId',
      tournamentId: 'anyTournamentId'
    }

    const output = await sut.execute(input)

    expect(output.subscriptionPaymentStatus).toBe('PAID')
  })
})
