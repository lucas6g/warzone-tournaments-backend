import { PlacementPoints } from '@/domain/enums/PlacementPoints'

export class TournamentScore {
  POINTS_PER_KILL = 1

  constructor (
    private readonly id: string,
    private readonly tournamentId: string,
    private readonly numberOfKills: number,
    private readonly placementPoints: PlacementPoints
  ) {}

  getScore (): number {
    return this.numberOfKills * this.POINTS_PER_KILL + this.placementPoints
  }

  getNumberOfKills (): number {
    return this.numberOfKills
  }

  getPlacementPoints (): number {
    return this.placementPoints
  }
}
