import { Game } from '@/domain/entities/Game'
import { Payment } from '@/domain/entities/Payment'
import { Player } from '@/domain/entities/Player'
import { Team } from '@/domain/entities/Team'
import { TeamPlayer } from '@/domain/entities/TeamPlayer'
import { TeamSubscription } from '@/domain/entities/TeamSubscription'
import { Tournament } from '@/domain/entities/Tournament'

import { PaymentStatus } from '@/domain/enums/PaymentStatus'
import { PlayerRole } from '@/domain/enums/PlayerRole'
import { TournamentType } from '@/domain/enums/TournamentType'
import { TeamSubscriptionError } from '@/domain/errors/TeamSubscriptionError'
import { set } from 'mockdate'

describe('TeamSubscription', () => {
  let sut: TeamSubscription
  let team: Team
  let tournament: Tournament
  let payment: Payment
  let commomPlayer: Player
  let game: Game

  beforeAll(() => {
    set(new Date('2022-07-15T14:00:00'))
  })

  beforeEach(() => {
    team = new Team(
      'anyTeamId',
      'anyTeamName',
      'anyTeamLogo',
      new Player(
        'anyId',
        'anyName',
        'anyEmail',
        'anyPassword',
        1.2,
        'anyPixkey',
        'anyGamerTag',
        'anyPlatForm'
      )
    )
    commomPlayer = new Player(
      'anyId',
      'anyName',
      'anyEmail',
      'anyPassword',
      1.6,
      'anyPixkey',
      'anyGamerTag',
      'anyPlatForm'
    )
    jest.spyOn(team, 'getTotalPlayers').mockReturnValue(3)

    game = new Game('anyGameId', 'anyGameName', 'anyGameImage')
    tournament = new Tournament(
      'anyTournomentId',
      new Date('2022-07-15T17:00:00'),
      new Date('2022-07-15T19:00:00'),
      5,
      1.5,
      game,
      'anyDescription',
      'anyMode',
      TournamentType.TRIOS
    )
    payment = new Payment()
    jest.spyOn(payment, 'getStatus').mockReturnValue(PaymentStatus.PAID)
    sut = new TeamSubscription(tournament, team, payment)
  })

  it('should create a TeamSubscription', () => {
    const total = sut.calculateTotal(tournament.getRegistrationCoust())

    expect(sut.getTeam()).toEqual(team)
    expect(sut.getTournament()).toEqual(tournament)
    expect(total).toBe(15)
  })
  it('should not subscribe a Team to a Tournament if number of players is different from the tournament', () => {
    jest.spyOn(team, 'getTotalPlayers').mockReturnValueOnce(4)
    expect(() => new TeamSubscription(tournament, team, payment)).toThrow(
      new TeamSubscriptionError(
        'number of team players is different from the type of tournament'
      )
    )
  })
  it('should not subscribe a Team to a Tournament during the Tournament period', () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date('2022-07-15T17:15:00').getTime()
    })
    expect(() => new TeamSubscription(tournament, team, payment)).toThrow(
      new TeamSubscriptionError(
        'subscription denied tournament is already in progress'
      )
    )
  })
  it('should not subscribe a Team to a Tournament when the Tournament is over', () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date('2022-07-15T19:15:00').getTime()
    })
    expect(() => new TeamSubscription(tournament, team, payment)).toThrow(
      new TeamSubscriptionError('subscription denied tournament is over')
    )
  })
  it('should not subscribe a Team to a Tournament if team member kd level is bigger than Tounament killDeathRatioLimit ', () => {
    const player1 = new TeamPlayer(commomPlayer, 'anyTeamId', PlayerRole.COMMON)
    const player2 = new TeamPlayer(commomPlayer, 'anyTeamId', PlayerRole.COMMON)

    jest.spyOn(team, 'getTeamPlayers').mockReturnValueOnce([player1, player2])

    expect(() => new TeamSubscription(tournament, team, payment)).toThrow(
      new TeamSubscriptionError(
        'subscription denied team member kd level is bigger than Tounament killDeathRatioLimit'
      )
    )
  })
  it('should not subscribe a Team to a Tournament if Payment status different of PAID ', () => {
    jest.spyOn(payment, 'getStatus').mockReturnValueOnce(PaymentStatus.OPENED)
    expect(() => new TeamSubscription(tournament, team, payment)).toThrow(
      new TeamSubscriptionError(
        'subscription denied tournoment fee was not paid'
      )
    )
  })
})
