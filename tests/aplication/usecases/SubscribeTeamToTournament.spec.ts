import { TeamRepository } from '@/aplication/protocols/repositories/TeamRepository'
import { TournamentRepository } from '@/aplication/protocols/repositories/TournamentRepository'
import { SubscribeTeamToTournament } from '@/aplication/usecases/SubscribeTeamToTournament'
import { mock, MockProxy } from 'jest-mock-extended'

describe('SubscribeTeamToTournament', () => {
  let tournamentRepository: MockProxy<TournamentRepository>
  let teamRepository: MockProxy<TeamRepository>
  let sut: SubscribeTeamToTournament

  beforeEach(() => {
    tournamentRepository = mock<TournamentRepository>()
    teamRepository = mock<TeamRepository>()
    sut = new SubscribeTeamToTournament(tournamentRepository, teamRepository)
  })

  it('should subscribe a Team to a Tournament', async () => {
    const input = {
      teamId: 'anyTeamId',
      tournamentId: 'anyTournamentId'
    }

    const output = await sut.execute(input)

    expect(output.subscriptionPaymentStatus).toBe('PAID')
  })
  it('should call TounamentRespository findById method with correct tournamentId', async () => {
    const input = {
      teamId: 'anyTeamId',
      tournamentId: 'anyTournamentId'
    }

    await sut.execute(input)

    expect(tournamentRepository.findById).toHaveBeenCalledWith(
      input.tournamentId
    )
  })
  it('should call TeamRepository findById method with correct teamId', async () => {
    const input = {
      teamId: 'anyTeamId',
      tournamentId: 'anyTournamentId'
    }

    await sut.execute(input)

    expect(teamRepository.findById).toHaveBeenCalledWith(input.teamId)
  })
})
