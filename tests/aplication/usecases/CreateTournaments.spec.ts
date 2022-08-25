import { CreateTournamentsError } from '@/aplication/errors/CreateTournamentsError'
import { GameRepository } from '@/aplication/protocols/GameRepository'
import { IDGenerator } from '@/aplication/protocols/IDGenerator'
import { TournamentRepository } from '@/aplication/protocols/TournamentRepository'
import {
  CreateTournaments,
  Input
} from '@/aplication/usecases/CreateTournaments'
import { Game } from '@/domain/entities/Game'
import { Tournament } from '@/domain/entities/Tournament'
import { TournamentType } from '@/domain/enums/TournamentType'
import { mock, MockProxy } from 'jest-mock-extended'
import { set } from 'mockdate'

describe('CreateTournaments', () => {
  let gameRepository: MockProxy<GameRepository>
  let idGenerator: MockProxy<IDGenerator>
  let tournamentRepository: MockProxy<TournamentRepository>
  let input: Input[]
  let sut: CreateTournaments
  beforeAll(() => {
    set(new Date('2022-07-16T00:00:00'))
  })

  beforeEach(() => {
    gameRepository = mock<GameRepository>()
    idGenerator = mock<IDGenerator>()
    tournamentRepository = mock<TournamentRepository>()

    gameRepository.findByGivenNames.mockResolvedValue([
      new Game('anyId', 'warzone', 'anyImage')
    ])
    idGenerator.generate.mockReturnValue('anyTournamentId')

    sut = new CreateTournaments(
      gameRepository,
      idGenerator,
      tournamentRepository
    )

    input = [
      {
        startAt: new Date('2022-08-16T10:00:00'),
        endsAt: new Date('2022-08-16T12:00:00'),
        registrationCoust: 10,
        killDeathRatioLimit: 1.0,
        description: 'Caldera Trios',
        map: 'caldera',
        mode: 'killrace',
        type: 3,
        gameName: 'warzone'
      },
      {
        startAt: new Date('2022-08-16T12:00:00'),
        endsAt: new Date('2022-08-16T14:00:00'),
        registrationCoust: 7,
        killDeathRatioLimit: 2.0,
        description: 'Caldera Trios',
        map: 'caldera',
        mode: 'killrace',
        type: 3,
        gameName: 'warzone'
      },
      {
        startAt: new Date('2022-08-16T14:00:00'),
        endsAt: new Date('2022-08-16T16:00:00'),
        registrationCoust: 5,
        killDeathRatioLimit: 1.5,
        description: 'Caldera Trios',
        map: 'caldera',
        mode: 'killrace',
        type: 3,
        gameName: 'warzone'
      },
      {
        startAt: new Date('2022-08-16T16:00:00'),
        endsAt: new Date('2022-08-16T18:00:00'),
        registrationCoust: 8,
        killDeathRatioLimit: 1.65,
        description: 'Caldera Trios',
        map: 'caldera',
        mode: 'killrace',
        type: 3,
        gameName: 'warzone'
      },
      {
        startAt: new Date('2022-08-16T18:00:00'),
        endsAt: new Date('2022-08-16T20:00:00'),
        registrationCoust: 5,
        killDeathRatioLimit: 1.5,
        description: 'Caldera Trios',
        map: 'caldera',
        mode: 'killrace',
        type: 3,
        gameName: 'warzone'
      },
      {
        startAt: new Date('2022-08-16T20:00:00'),
        endsAt: new Date('2022-08-16T22:00:00'),
        registrationCoust: 5,
        killDeathRatioLimit: 1.5,
        description: 'Caldera Trios',
        map: 'caldera',
        mode: 'killrace',
        type: 3,
        gameName: 'warzone'
      }
    ]
  })

  it('should create new Tournaments', async () => {
    await expect(sut.execute(input)).resolves.toBe(undefined)
  })
  it('should CreateTournoments calls GameRepository findByGivenNames method with correct parameters', async () => {
    await sut.execute(input)

    expect(gameRepository.findByGivenNames).toHaveBeenCalledWith(['warzone'])
  })
  it('should throw CreateTournamentsError when GameRepository findByGivenNames returns no game', async () => {
    gameRepository.findByGivenNames.mockResolvedValueOnce(undefined)

    await expect(sut.execute(input)).rejects.toThrow(
      new CreateTournamentsError('Games not found')
    )
  })
  it('should CreateTournaments calls IdGenerator generate method', async () => {
    await sut.execute(input)
    expect(idGenerator.generate).toHaveBeenCalledTimes(6)
  })
  it('should CreateTournaments calls TournamentRepository saveAll with correct parameters', async () => {
    await sut.execute(input)

    const game = new Game('anyId', 'warzone', 'anyImage')

    expect(tournamentRepository.saveAll).toHaveBeenCalledWith([
      new Tournament(
        'anyTournamentId',
        new Date('2022-08-16T10:00:00'),
        new Date('2022-08-16T12:00:00'),
        10,
        1.0,
        game,
        'Caldera Trios',
        'caldera',
        'killrace',
        TournamentType.TRIOS
      ),
      new Tournament(
        'anyTournamentId',
        new Date('2022-08-16T12:00:00'),
        new Date('2022-08-16T14:00:00'),
        7,
        2.0,
        game,
        'Caldera Trios',
        'caldera',
        'killrace',
        TournamentType.TRIOS
      ),

      new Tournament(
        'anyTournamentId',
        new Date('2022-08-16T14:00:00'),
        new Date('2022-08-16T16:00:00'),
        5,
        1.5,
        game,
        'Caldera Trios',
        'caldera',
        'killrace',
        TournamentType.TRIOS
      ),
      new Tournament(
        'anyTournamentId',
        new Date('2022-08-16T16:00:00'),
        new Date('2022-08-16T18:00:00'),
        8,
        1.65,
        game,
        'Caldera Trios',
        'caldera',
        'killrace',
        TournamentType.TRIOS
      ),
      new Tournament(
        'anyTournamentId',
        new Date('2022-08-16T18:00:00'),
        new Date('2022-08-16T20:00:00'),
        5,
        1.5,
        game,
        'Caldera Trios',
        'caldera',
        'killrace',
        TournamentType.TRIOS
      ),
      new Tournament(
        'anyTournamentId',
        new Date('2022-08-16T20:00:00'),
        new Date('2022-08-16T22:00:00'),
        5,
        1.5,
        game,
        'Caldera Trios',
        'caldera',
        'killrace',
        TournamentType.TRIOS
      )
    ])
  })
})
