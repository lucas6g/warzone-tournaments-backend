import { RegisterPlayerError } from '@/aplication/errors/RegisterPlayerError'
import { CodAPI } from '@/aplication/protocols/gateways/CodAPI'
import { Hasher } from '@/aplication/protocols/Hasher'
import { IDGenerator } from '@/aplication/protocols/IDGenerator'
import { PlayerRepository } from '@/aplication/protocols/repositories/PlayerRepository'
import { TokenGenerator } from '@/aplication/protocols/TokenGenerator'

import { UseCase } from '@/aplication/protocols/UseCase'
import { Player } from '@/domain/entities/Player'

export class RegisterPlayer implements UseCase<Input, Output> {
  constructor (
    private readonly codAPI: CodAPI,
    private readonly playerRepository: PlayerRepository,
    private readonly hasher: Hasher,
    private readonly idGenerator: IDGenerator,
    private readonly tokenGenerator: TokenGenerator
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
    const hashedPassword = this.hasher.hash(input.password)

    const playerId = this.idGenerator.generate()
    const token = this.tokenGenerator.generate(playerId)

    await this.playerRepository.save(
      new Player(
        playerId,
        input.email,
        hashedPassword,
        input.pixKey,
        input.gamertag,
        input.platform
      )
    )
    return {
      accessToken: token
    }
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
