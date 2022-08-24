import { CreateTournaments } from '@/aplication/usecases/CreateTournaments'
import { set } from 'mockdate'

describe('CreateTournaments', () => {
  beforeAll(() => {
    set(new Date('2022-07-16T00:00:00'))
  })
  it('should create new Tournaments', async () => {
    const input = [
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

    const sut = new CreateTournaments()

    await expect(sut.execute(input)).resolves.toBe(undefined)
  })
})
