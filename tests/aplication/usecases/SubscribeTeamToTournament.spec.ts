import { TournamentRepository } from '@/aplication/protocols/repositories/TournamentRepository'
import { SubscribeTeamToTournament } from '@/aplication/usecases/SubscribeTeamToTournament'
import { mock, MockProxy } from 'jest-mock-extended'

describe('SubscribeTeamToTournament', () => {
  let tournamentRepository: MockProxy<TournamentRepository>

  beforeEach(() => {
    tournamentRepository = mock<TournamentRepository>()
  })

  it('should subscribe a Team to a Tournament', async () => {
    const sut = new SubscribeTeamToTournament(tournamentRepository)

    const input = {
      teamId: 'anyTeamId',
      tournamentId: 'anyTournamentId'
    }

    const output = await sut.execute(input)

    expect(output.subscriptionPaymentStatus).toBe('PAID')
  })
  it('should call TounamentRespository findById method with correct tournamentId', async () => {
    const sut = new SubscribeTeamToTournament(tournamentRepository)

    const input = {
      teamId: 'anyTeamId',
      tournamentId: 'anyTournamentId'
    }

    await sut.execute(input)

    expect(tournamentRepository.findById).toHaveBeenCalledWith(
      input.tournamentId
    )
  })
})
