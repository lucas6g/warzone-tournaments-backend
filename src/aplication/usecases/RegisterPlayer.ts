import { RegisterPlayerError } from '@/aplication/errors/RegisterPlayerError'
import { CodAPI } from '@/aplication/protocols/gateways/CodAPI'
import { Hasher } from '@/aplication/protocols/Hasher'
import { IDGenerator } from '@/aplication/protocols/IDGenerator'
import { PlayerRepository } from '@/aplication/protocols/repositories/PlayerRepository'

import { UseCase } from '@/aplication/protocols/UseCase'

export class RegisterPlayer implements UseCase<Input, Output> {
  constructor (
    private readonly codAPI: CodAPI,
    private readonly playerRepository: PlayerRepository,
    private readonly hasher: Hasher,
    private readonly idGenerator: IDGenerator
  ) {}

  async execute (input: Input): Promise<Output> {
    const hasAccount = await this.codAPI.hasAccount(
      input.gamertag,
      input.platform
    )
    if (!hasAccount) {
      throw new RegisterPlayerError(
        `account with gamertag: ${input.gamertag} and platform: ${input.platform} was not found`
      )
    }
    const player = await this.playerRepository.findByEmail(input.email)

    if (player !== undefined) {
      throw new RegisterPlayerError(`email: ${input.email} is already in use`)
    }
    this.hasher.hash(input.password)
    this.idGenerator.generate()

    return await Promise.resolve({ accessToken: 'anyAccessToken' })
  }
}

export type Input = {
  gamertag: string
  platform: string
  email: string
  password: string
  pixKey: string
}

type Output = {
  accessToken: string
}
