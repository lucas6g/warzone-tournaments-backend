import { Game } from '@/domain/entities/Game'
import { Payment } from '@/domain/entities/Payment'
import { Player } from '@/domain/entities/Player'
import { set } from 'mockdate'

import { Team } from '@/domain/entities/Team'
import { TeamSubscription } from '@/domain/entities/TeamSubscription'
import { Tournament } from '@/domain/entities/Tournament'
import { TournamentScore } from '@/domain/entities/TournamentScore'
import { GameType } from '@/domain/enums/GameType'
import { PaymentStatus } from '@/domain/enums/PaymentStatus'
import { PlacementPoints } from '@/domain/enums/PlacementPoints'
import { TournamentError } from '@/domain/errors/TournamentError'

describe('Tournament', () => {
  let sut: Tournament
  let game: Game
  let startAt: Date
  let endAt: Date
  let team: Team
  let payment: Payment
  let teamSubscription: TeamSubscription
  let player: Player
  let team1: Team
  let team2: Team
  let team3: Team

  beforeAll(() => {
    set(new Date('2022-07-15T14:00:00'))
  })
  beforeEach(() => {
    player = new Player(
      'anyId',
      'anyName',
      'anyEmail',
      'anyPassword',
      1.2,
      'anyPixkey',
      'anyGamerTag',
      'anyPlatForm'
    )
    team = new Team('anyTeamId', 'anyTeamName', 'anyTeamLogo', player)

    jest.spyOn(team, 'getTotalPlayers').mockReturnValue(3)

    game = new Game(
      'anyGameId',
      'anyGameName',
      GameType.TRIOS,
      'anyGameImage',
      'anyGameMode'
    )
    startAt = new Date('2022-07-15T17:00:00')
    endAt = new Date('2022-07-15T19:00:00')
    sut = new Tournament('anyTournomentId', startAt, endAt, 5, 1.5, game)

    team1 = new Team('anyTeamId', 'faze', 'anyTeamLogo', player)
    team2 = new Team('anyTeamId', 'los grandes', 'anyTeamLogo', player)
    team3 = new Team('anyTeamId', 'zetas', 'anyTeamLogo', player)
    team1.addPlayer(player)
    team1.addPlayer(player)
    team2.addPlayer(player)
    team2.addPlayer(player)
    team3.addPlayer(player)
    team3.addPlayer(player)
    team1.addTournamentScore(
      new TournamentScore('anyId', sut.getId(), 8, PlacementPoints.FIRSTPLACE)
    )
    team1.addTournamentScore(
      new TournamentScore('anyId', sut.getId(), 45, PlacementPoints.FIRSTPLACE)
    )
    team1.addTournamentScore(
      new TournamentScore('anyId', sut.getId(), 45, PlacementPoints.FIRSTPLACE)
    )

    team2.addTournamentScore(
      new TournamentScore('anyId', sut.getId(), 45, PlacementPoints.FIRSTPLACE)
    )
    team2.addTournamentScore(
      new TournamentScore('anyId', sut.getId(), 45, PlacementPoints.FIRSTPLACE)
    )
    team2.addTournamentScore(
      new TournamentScore('anyId', sut.getId(), 4, PlacementPoints.SECONDPLACE)
    )

    team3.addTournamentScore(
      new TournamentScore('anyId', sut.getId(), 45, PlacementPoints.SECONDPLACE)
    )
    team3.addTournamentScore(
      new TournamentScore('anyId', sut.getId(), 45, PlacementPoints.FOURTHPLACE)
    )
    team3.addTournamentScore(
      new TournamentScore('anyId', sut.getId(), 10, PlacementPoints.EIGHTHPLACE)
    )

    payment = new Payment()
    jest.spyOn(payment, 'getStatus').mockReturnValue(PaymentStatus.PAID)
    teamSubscription = new TeamSubscription(sut, team, payment)
  })
  it('should create a Tournament with a game', () => {
    expect(sut.getPrize()).toBe(0)
    expect(sut.getGame()).toBeInstanceOf(Game)
  })

  it('should not create a Tournament with past startAt date', () => {
    const pastStartAtDate = new Date('2022-07-14T10:00:00')

    expect(
      () =>
        new Tournament('anyTournomentId', pastStartAtDate, endAt, 5, 1.5, game)
    ).toThrow(new TournamentError('Invalid past date'))
  })

  it('should not create a Tournament with past endsAt date', () => {
    const pastEndAtDate = new Date('2022-07-14T17:00:00')

    expect(
      () =>
        new Tournament('anyTournomentId', startAt, pastEndAtDate, 5, 1.5, game)
    ).toThrow(new TournamentError('Invalid past date'))
  })
  it('should add TeamSubscription to tournament', () => {
    sut.addSubscription(teamSubscription)

    expect(sut.getPrize()).toBe(15)
  })

  it('should return the number of subscriptions registered in the Tournament', () => {
    sut.addSubscription(teamSubscription)
    sut.addSubscription(teamSubscription)
    sut.addSubscription(teamSubscription)

    const numberOfTeamsRegistered = sut.getNumberOfTeamsRegistered()

    expect(numberOfTeamsRegistered).toBe(3)
  })
  it('should return the registrationCoust', () => {
    const registrationCoust = sut.getRegistrationCoust()

    expect(registrationCoust).toBe(5)
  })
  it('should generate Tournament classification', () => {
    sut.addSubscription(new TeamSubscription(sut, team1, payment))
    sut.addSubscription(new TeamSubscription(sut, team2, payment))
    sut.addSubscription(new TeamSubscription(sut, team3, payment))

    const classification = sut.generateClassification()

    expect(classification).toEqual([
      {
        placement: 0,
        teamName: 'faze',
        teamId: 'anyTeamId',
        totalkills: 98,
        totalPlacementPoints: 30,
        finalScore: 128
      },
      {
        placement: 1,
        teamId: 'anyTeamId',
        teamName: 'los grandes',
        totalkills: 94,
        totalPlacementPoints: 29,
        finalScore: 123
      },
      {
        placement: 2,
        teamId: 'anyTeamId',
        teamName: 'zetas',
        totalkills: 100,
        totalPlacementPoints: 19,
        finalScore: 119
      }
    ])
  })
  it('should define which placements that receive award', () => {
    sut.addSubscription(new TeamSubscription(sut, team1, payment))
    sut.addSubscription(new TeamSubscription(sut, team2, payment))
    sut.addSubscription(new TeamSubscription(sut, team3, payment))

    const placementsThatReceiveAwards = sut.getPlacementsThatReceiveAward()

    expect(placementsThatReceiveAwards).toEqual([
      {
        placement: 0,
        teamName: 'faze',
        teamId: 'anyTeamId',
        totalkills: 98,
        totalPlacementPoints: 30,
        finalScore: 128
      },
      {
        placement: 1,
        teamId: 'anyTeamId',
        teamName: 'los grandes',
        totalkills: 94,
        totalPlacementPoints: 29,
        finalScore: 123
      },
      {
        placement: 2,
        teamId: 'anyTeamId',
        teamName: 'zetas',
        totalkills: 100,
        totalPlacementPoints: 19,
        finalScore: 119
      }
    ])
  })
})
