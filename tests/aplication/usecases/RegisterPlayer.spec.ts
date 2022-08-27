import { CodAPI } from '@/aplication/protocols/CodAPI'
import { RegisterPlayer } from '@/aplication/usecases/RegisterPlayer'
import { mock, MockProxy } from 'jest-mock-extended'

describe('RegisterPlayer', () => {
  let codAPI: MockProxy<CodAPI>
  beforeEach(() => {
    codAPI = mock<CodAPI>()
  })

  it('should register a player', async () => {
    const sut = new RegisterPlayer(codAPI)

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
  it('should call CodAPI hasAccount method with correct gamertag and platform', async () => {
    const sut = new RegisterPlayer(codAPI)

    const input = {
      gamertag: 'anyGamerTag',
      platform: 'anyPlatform',
      email: 'anyEmail@gmai.com',
      password: 'anyPassword',
      pixKey: 'anyPixkey'
    }
    await sut.execute(input)

    expect(codAPI.hasAccount).toHaveBeenCalledWith('anyGamerTag', 'anyPlatform')
  })
})
