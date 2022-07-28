import { Game } from '@/domain/entities/Game'
import { Payment } from '@/domain/entities/Payment'
import { Player } from '@/domain/entities/Player'
import { Team } from '@/domain/entities/Team'
import { TeamSubscription } from '@/domain/entities/TeamSubscription'
import { Tournament } from '@/domain/entities/Tournament'
import { GameType } from '@/domain/enums/GameType'
import { PaymentStatus } from '@/domain/enums/PaymentStatus'
import { PlayerRole } from '@/domain/enums/PlayerRole'
import { TeamSubscriptionError } from '@/domain/errors/TeamSubscriptionError'

describe('TeamSubscription', () => {
  let sut: TeamSubscription
  let team: Team
  let tournament: Tournament
  let payment: Payment

  beforeEach(() => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date('2022-07-15T14:00:00').getTime()
    })

    team = new Team('anyTeamId', 'anyTeamName', 'anyTeamLogo')
    tournament = new Tournament(
      'anyTournomentId',
      new Date('2022-07-15T17:00:00'),
      new Date('2022-07-15T19:00:00'),
      5,
      1.5,
      new Game(
        'anyGameId',
        'anyGameName',
        GameType.TRIOS,
        'anyGameImage',
        'anyGameMode'
      )
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
  it('should not subscribe a Team to a Tournament if number of players is different from the GameType', () => {
    jest.spyOn(team, 'getTotalPlayers').mockReturnValueOnce(4)
    expect(() => new TeamSubscription(tournament, team, payment)).toThrow(
      new TeamSubscriptionError(
        'number of team players is different from the type of game'
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
    const player1 = new Player(
      'anyId',
      'anyName',
      'anyEmail',
      'anyPassword',
      1.51,
      'anyPixkey',
      PlayerRole.COMMON,
      'anyGamerTag',
      'anyPlatForm'
    )
    const player2 = new Player(
      'anyId',
      'anyName',
      'anyEmail',
      'anyPassword',
      1.12,
      'anyPixkey',
      PlayerRole.COMMON,
      'anyGamerTag',
      'anyPlatForm'
    )
    const player3 = new Player(
      'anyId',
      'anyName',
      'anyEmail',
      'anyPassword',
      1.11,
      'anyPixkey',
      PlayerRole.COMMON,
      'anyGamerTag',
      'anyPlatForm'
    )

    jest
      .spyOn(team, 'getPlayers')
      .mockReturnValueOnce([player1, player2, player3])

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
