import { CreateTournamentsError } from '@/aplication/errors/CreateTournamentsError'

import { IDGenerator } from '@/aplication/protocols/IDGenerator'
import { GameRepository } from '@/aplication/protocols/repositories/GameRepository'
import { TournamentRepository } from '@/aplication/protocols/repositories/TournamentRepository'
import { UseCase } from '@/aplication/protocols/UseCase'
import { Tournament } from '@/domain/entities/Tournament'

export class CreateTournaments implements UseCase<Input[]> {
  constructor (
    private readonly gameRepository: GameRepository,
    private readonly idGenerator: IDGenerator,
    private readonly tournamentRepository: TournamentRepository
  ) {}

  async execute (input: Input[]): Promise<void> {
    const gameNames = input.map(input => {
      return input.gameName
    })
    const uniqueGameNames = [...new Set(gameNames)]
    const games = await this.gameRepository.findByGivenNames(uniqueGameNames)
    if (games === undefined) {
      throw new CreateTournamentsError('Games not found')
    }

    const tournaments: Tournament[] = []

    for (const tournamentInput of input) {
      const game = games.find(game => {
        return game.getName() === tournamentInput.gameName
      })

      if (game != null) {
        const tournamentId = this.idGenerator.generate()

        tournaments.push(
          new Tournament(
            tournamentId,
            tournamentInput.startAt,
            tournamentInput.endsAt,
            tournamentInput.registrationCoust,
            tournamentInput.killDeathRatioLimit,
            game,
            tournamentInput.description,
            tournamentInput.map,
            tournamentInput.mode,
            tournamentInput.type
          )
        )
      }
    }
    await this.tournamentRepository.saveAll(tournaments)
  }
}

export type Input = {
  startAt: Date
  endsAt: Date
  registrationCoust: number
  killDeathRatioLimit: number
  description: string
  mode: string
  type: number
  map: string
  gameName: string
}
