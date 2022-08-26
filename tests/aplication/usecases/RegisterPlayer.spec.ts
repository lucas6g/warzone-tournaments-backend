import { RegisterPlayer } from '@/aplication/usecases/RegisterPlayer'

describe('RegisterPlayer', () => {
  it('should register a player', async () => {
    const sut = new RegisterPlayer()

    const input = {
      gamertag: 'anyGamerTag',
      platform: 'anyPlatform',
      email: 'anyEmail@gmai.com',
      password: 'anyPassword',
      pixKey: 'anyPixkey'
    }
    const output = await sut.execute(input)

    expect(output.accessToken).toBe('anyAccessToken')
  })
})
