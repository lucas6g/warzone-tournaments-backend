import { Player } from '@/domain/entities/Player'
import { Team } from '@/domain/entities/Team'
import { TournamentScore } from '@/domain/entities/TournamentScore'
import { PlacementPoints } from '@/domain/enums/PlacementPoints'

describe('Team', () => {
  let sut: Team

  beforeEach(() => {
    sut = new Team('anyId', 'anyName', 'anyLogo', 'leaderId')
  })

  it('should create a Team with a leader', () => {
    expect(sut.getId()).toBe('anyId')
    expect(sut.getLeaderId()).toBe('leaderId')
    expect(sut.getTotalPlayers()).toBe(1)
  })
  it('should add a Player to the Team', () => {
    sut.addPlayer(
      new Player(
        'leaderId',
        'anyEmail',
        'anyPassword',
        'anyPixkey',
        'anyGamerTag',
        'anyPlatForm'
      )
    )

    expect(sut.getTotalPlayers()).toBe(2)
  })
  it('should add a TournamentScore to the Team', () => {
    sut.addTournamentScore(
      new TournamentScore(
        'anyId',
        'tournomentId',
        PlacementPoints.FIRSTPLACE,
        22
      )
    )

    expect(sut.getTournamentScores().length).toBe(1)
  })
})
