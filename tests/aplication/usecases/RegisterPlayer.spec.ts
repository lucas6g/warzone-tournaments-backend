import { RegisterPlayerError } from '@/aplication/errors/RegisterPlayerError'
import { CodAPI } from '@/aplication/protocols/gateways/CodAPI'
import { Hasher } from '@/aplication/protocols/Hasher'
import { IDGenerator } from '@/aplication/protocols/IDGenerator'
import { PlayerRepository } from '@/aplication/protocols/repositories/PlayerRepository'
import { TokenGenerator } from '@/aplication/protocols/TokenGenerator'

import { Input, RegisterPlayer } from '@/aplication/usecases/RegisterPlayer'
import { Player } from '@/domain/entities/Player'
import { mock, MockProxy } from 'jest-mock-extended'

describe('RegisterPlayer', () => {
  let codAPI: MockProxy<CodAPI>
  let idGenerator: MockProxy<IDGenerator>
  let playerRepository: MockProxy<PlayerRepository>
  let tokenGenerator: MockProxy<TokenGenerator>
  let input: Input
  let hasher: MockProxy<Hasher>
  let sut: RegisterPlayer

  beforeEach(() => {
    input = {
      gamertag: 'anyGamerTag',
      platform: 'anyPlatForm',
      email: 'anyEmail@gmail.com',
      password: 'anyPassword',
      pixKey: 'anyPixkey'
    }

    idGenerator = mock<IDGenerator>()
    codAPI = mock<CodAPI>()
    tokenGenerator = mock<TokenGenerator>()
    playerRepository = mock<PlayerRepository>()
    hasher = mock<Hasher>()
    sut = new RegisterPlayer(
      codAPI,
      playerRepository,
      hasher,
      idGenerator,
      tokenGenerator
    )

    tokenGenerator.generate.mockReturnValue('anyAccessToken')
    codAPI.hasAccount.mockResolvedValue(true)
    playerRepository.findByEmail.mockResolvedValue(undefined)
    idGenerator.generate.mockReturnValue('anyId')
  })

  it('should register a player', async () => {
    const output = await sut.execute(input)

    expect(output.accessToken).toBe('anyAccessToken')
  })
  it('should call CodAPI hasAccount method with correct gamertag and platform', async () => {
    await sut.execute(input)

    expect(codAPI.hasAccount).toHaveBeenCalledWith('anyGamerTag', 'anyPlatForm')
  })
  it('should throw RegisterPlayerError if hasAccount method returns false', async () => {
    codAPI.hasAccount.mockResolvedValueOnce(false)

    await expect(sut.execute(input)).rejects.toThrow(
      new RegisterPlayerError(
        'account with gamertag: anyGamerTag and platform: anyPlatForm was not found'
      )
    )
  })

  it('should call PlayerRepository findByEmail method with correct parameters', async () => {
    await sut.execute(input)

    expect(playerRepository.findByEmail).toHaveBeenCalledWith(
      'anyEmail@gmail.com'
    )
  })
  it('should throw RegisterPlayerError if player email is already in use', async () => {
    playerRepository.findByEmail.mockResolvedValueOnce(
      new Player(
        'anyId',
        'anyEmail@gmail.com',
        'anyPassword',
        'anyPixkey',
        'anyGamerTag',
        'anyPlatForm'
      )
    )
    await expect(sut.execute(input)).rejects.toThrow(
      new RegisterPlayerError('email: anyEmail@gmail.com is already in use')
    )
  })
  it('should call Hasher hash method with player password', async () => {
    await sut.execute(input)

    expect(hasher.hash).toHaveBeenCalledWith('anyPassword')
  })
  it('should call IdGenerator generate method method', async () => {
    await sut.execute(input)

    expect(idGenerator.generate).toHaveBeenCalledTimes(1)
  })
  it('should call TokenGenerator generate with correct player id', async () => {
    await sut.execute(input)

    expect(tokenGenerator.generate).toBeCalledWith('anyId')
  })
  it('should call PlayerRepository save method with correct player instance', async () => {
    hasher.hash.mockReturnValueOnce('hashedPassword')

    await sut.execute(input)

    expect(playerRepository.save).toHaveBeenCalledWith(
      new Player(
        'anyId',
        'anyEmail@gmail.com',
        'hashedPassword',
        'anyPixkey',
        'anyGamerTag',
        'anyPlatForm'
      )
    )
  })
})
