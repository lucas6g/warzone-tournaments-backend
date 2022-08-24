import { CreateTournamentsError } from '@/aplication/errors/CreateTournamentsError'
import { GameRepository } from '@/aplication/protocols/GameRepository'
import {
  CreateTournaments,
  Input
} from '@/aplication/usecases/CreateTournaments'
import { Game } from '@/domain/entities/Game'
import { mock, MockProxy } from 'jest-mock-extended'
import { set } from 'mockdate'

describe('CreateTournaments', () => {
  let gameRepository: MockProxy<GameRepository>
  let input: Input[]
  beforeAll(() => {
    set(new Date('2022-07-16T00:00:00'))
  })

  beforeEach(() => {
    gameRepository = mock<GameRepository>()

    gameRepository.findByGivenNames.mockResolvedValue([
      new Game('anyId', 'warzone', 'anyImage')
    ])
    input = [
      {
        startAt: new Date('2022-08-16T10:00:00'),
        endsAt: new Date('2022-08-16T12:00:00'),
        registrationCoust: 10,
        killDeathRatioLimit: 1.0,
        description: 'Caldera Trios',
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
        mode: 'killrace',
        type: 3,
        gameName: 'warzone'
      },
      {
        startAt: new Date('2022-08-16T19:00:00'),
        endsAt: new Date('2022-08-16T21:00:00'),
        registrationCoust: 5,
        killDeathRatioLimit: 1.5,
        description: 'Caldera Trios',
        mode: 'killrace',
        type: 3,
        gameName: 'warzone'
      },
      {
        startAt: new Date('2022-08-16T21:00:00'),
        endsAt: new Date('2022-08-16T23:00:00'),
        registrationCoust: 5,
        killDeathRatioLimit: 1.5,
        description: 'Caldera Trios',
        mode: 'killrace',
        type: 3,
        gameName: 'warzone'
      }
    ]
  })

  it('should create new Tournaments', async () => {
    const sut = new CreateTournaments(gameRepository)

    await expect(sut.execute(input)).resolves.toBe(undefined)
  })
  it('should CreateTournoments calls GameRepository findByGivenNames method with correct parameters', async () => {
    const sut = new CreateTournaments(gameRepository)

    await sut.execute(input)

    expect(gameRepository.findByGivenNames).toHaveBeenCalledWith(['warzone'])
  })
  it('should throw CreateTournamentsError when GameRepository findByGivenNames returns no game', async () => {
    gameRepository.findByGivenNames.mockResolvedValueOnce(undefined)
    const sut = new CreateTournaments(gameRepository)

    await expect(sut.execute(input)).rejects.toThrow(
      new CreateTournamentsError('Games not found')
    )
  })
})
