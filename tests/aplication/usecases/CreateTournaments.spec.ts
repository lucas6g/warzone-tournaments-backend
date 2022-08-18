import { CreateTournaments } from '@/aplication/usecases/CreateTournaments'
import { set } from 'mockdate'

describe('CreateTournaments', () => {
  beforeAll(() => {
    set(new Date('2022-07-15T00:00:00'))
  })
  it('should create new Tournaments', async () => {
    const input = [
      {
        startAt: new Date('2022-08-15T10:00:00'),
        endsAt: new Date('2022-08-15T:12:00:00'),
        registrationCoust: 10,
        killDeathRatioLimit: 1.0,
        gameName: 'warzone'
      },
      {
        startAt: new Date('2022-08-15T12:00:00'),
        endsAt: new Date('2022-08-15T:14:00:00'),
        registrationCoust: 7,
        killDeathRatioLimit: 2.0,
        gameName: 'warzone'
      },
      {
        startAt: new Date('2022-08-15T14:00:00'),
        endsAt: new Date('2022-08-15T:16:00:00'),
        registrationCoust: 5,
        killDeathRatioLimit: 1.5,
        gameName: 'warzone'
      },
      {
        startAt: new Date('2022-08-15T16:00:00'),
        endsAt: new Date('2022-08-15T:18:00:00'),
        registrationCoust: 8,
        killDeathRatioLimit: 1.65,
        gameName: 'warzone'
      },
      {
        startAt: new Date('2022-08-15T19:00:00'),
        endsAt: new Date('2022-08-15T:21:00:00'),
        registrationCoust: 5,
        killDeathRatioLimit: 1.5,
        gameName: 'warzone'
      },
      {
        startAt: new Date('2022-08-15T21:00:00'),
        endsAt: new Date('2022-08-15T:23:00:00'),
        registrationCoust: 5,
        killDeathRatioLimit: 1.5,
        gameName: 'warzone'
      }
    ]

    const sut = new CreateTournaments()

    const output = await sut.execute(input)

    expect(output.status).toBe('created')
  })
})
