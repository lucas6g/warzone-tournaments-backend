import { Game } from '@/domain/entities/Game'
import { Payment } from '@/domain/entities/Payment'
import { Player } from '@/domain/entities/Player'

import { Team } from '@/domain/entities/Team'
import { TeamSubscription } from '@/domain/entities/TeamSubscription'
import { Tournament } from '@/domain/entities/Tournament'
import { GameType } from '@/domain/enums/GameType'
import { PaymentStatus } from '@/domain/enums/PaymentStatus'

import { InvalidPreviosDateError } from '@/domain/errors/InvalidPreviosDateError'

describe('Tournament', () => {
  let sut: Tournament
  let game: Game
  let startAt: Date
  let endAt: Date
  let team: Team
  let payment: Payment
  let teamSubscription: TeamSubscription

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
    jest.spyOn(team, 'getTotalPlayers').mockReturnValue(3)
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date('2022-07-15T14:00:00').getTime()
    })
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
    ).toThrow(new InvalidPreviosDateError('Invalid previos date'))
  })

  it('should not create a Tournament with past endsAt date', () => {
    const pastEndAtDate = new Date('2022-07-14T17:00:00')

    expect(
      () =>
        new Tournament('anyTournomentId', startAt, pastEndAtDate, 5, 1.5, game)
    ).toThrow(new InvalidPreviosDateError('Invalid previos date'))
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
})
