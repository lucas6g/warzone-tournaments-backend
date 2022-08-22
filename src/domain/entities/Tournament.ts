import { Game } from '@/domain/entities/Game'
import { TeamSubscription } from '@/domain/entities/TeamSubscription'
import { TournamentType } from '@/domain/enums/TournamentType'
import { TournamentError } from '@/domain/errors/TournamentError'
import { TeamPlacement } from '@/domain/types/TeamPlacement'

export class Tournament {
  FIFTHPLACE = 5 - 1
  constructor (
    private readonly id: string,
    private readonly startAt: Date,
    private readonly endAt: Date,
    private readonly registrationCoust: number,
    private readonly killDeathRatioLimit: number,
    private readonly game: Game,
    private readonly description: string,
    private readonly mode: string,
    private readonly type: TournamentType,

    private readonly teamSubscriptions: TeamSubscription[] = []
  ) {
    if (!this.isValidDate(startAt) || !this.isValidDate(endAt)) {
      throw new TournamentError('Invalid past date')
    }
  }

  getPrize (): number {
    return this.teamSubscriptions.reduce((total, teamSubscription) => {
      return total + teamSubscription.calculateTotal(this.registrationCoust)
    }, 0)
  }

  addSubscription (susbcription: TeamSubscription): void {
    this.teamSubscriptions.push(susbcription)
  }

  getNumberOfTeamsRegistered (): number {
    return this.teamSubscriptions.length
  }

  isValidDate (date: Date, today: Date = new Date()): boolean {
    const isPastDate = date.getTime() < today.getTime()
    if (isPastDate) {
      return false
    }
    return true
  }

  generateClassification (): TeamPlacement[] {
    const teamPlacements: TeamPlacement[] = []
    for (const [index, teamSubscription] of this.teamSubscriptions.entries()) {
      const team = teamSubscription.getTeam()
      const finalTeamScore = team.getTournamentScores().reduce(
        (acc, tournamentScore) => {
          acc.totalkills += tournamentScore.getNumberOfKills()
          acc.totalPlacementPoints += tournamentScore.getPlacementPoints()
          acc.finalScore += tournamentScore.getScore()
          return acc
        },
        {
          totalkills: 0,
          totalPlacementPoints: 0,
          finalScore: 0
        }
      )
      teamPlacements.push({
        placement: index,
        teamId: team.getId(),
        teamName: team.getName(),
        totalkills: finalTeamScore.totalkills,
        totalPlacementPoints: finalTeamScore.totalPlacementPoints,
        finalScore: finalTeamScore.finalScore
      })
    }
    this.sortTeamPlacements(teamPlacements)
    return teamPlacements
  }

  private sortTeamPlacements (teamPlacements: TeamPlacement[]): void {
    teamPlacements.sort((a, b) => b.finalScore - a.finalScore)
  }

  getPlacementsThatReceiveAward (): TeamPlacement[] {
    return this.generateClassification().filter(
      teamPlacement => teamPlacement.placement <= this.FIFTHPLACE
    )
  }

  getType (): TournamentType {
    return this.type
  }

  getGame (): Game {
    return this.game
  }

  getRegistrationCoust (): number {
    return this.registrationCoust
  }

  getStartAt (): Date {
    return this.startAt
  }

  getEndAt (): Date {
    return this.endAt
  }

  getkillDeathRatioLimit (): number {
    return this.killDeathRatioLimit
  }

  getId (): string {
    return this.id
  }
}
