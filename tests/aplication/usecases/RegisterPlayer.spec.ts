import { RegisterPlayerError } from '@/aplication/errors/RegisterPlayerError'
import { CodAPI } from '@/aplication/protocols/CodAPI'
import { Input, RegisterPlayer } from '@/aplication/usecases/RegisterPlayer'
import { mock, MockProxy } from 'jest-mock-extended'

describe('RegisterPlayer', () => {
  let codAPI: MockProxy<CodAPI>
  let input: Input
  let sut: RegisterPlayer
  beforeEach(() => {
    input = {
      gamertag: 'anyGamerTag',
      platform: 'anyPlatform',
      email: 'anyEmail@gmai.com',
      password: 'anyPassword',
      pixKey: 'anyPixkey'
    }
    codAPI = mock<CodAPI>()
    sut = new RegisterPlayer(codAPI)
    codAPI.hasAccount.mockResolvedValue(true)
  })

  it('should register a player', async () => {
    const output = await sut.execute(input)

    expect(output.accessToken).toBe('anyAccessToken')
  })
  it('should call CodAPI hasAccount method with correct gamertag and platform', async () => {
    await sut.execute(input)

    expect(codAPI.hasAccount).toHaveBeenCalledWith('anyGamerTag', 'anyPlatform')
  })
  it('should throw RegisterPlayerError if hasAccount method returns false', async () => {
    codAPI.hasAccount.mockResolvedValueOnce(false)

    await expect(sut.execute(input)).rejects.toThrow(
      new RegisterPlayerError(
        'account with gamertag: anyGamerTag and platform: anyPlatform was not found'
      )
    )
  })
})
