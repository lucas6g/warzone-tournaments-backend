import { PlacementPoints } from '@/domain/enums/PlacementPoints'

export class TournamentScore {
  constructor (
    private readonly id: string,
    private readonly tournamentId: string,
    private readonly teamId: string,
    private readonly numberOfKills: number,
    private readonly placementPoints: PlacementPoints
  ) {}
}
