import { RegisterPlayerError } from '@/aplication/errors/RegisterPlayerError'
import { CodAPI } from '@/aplication/protocols/CodAPI'
import { PlayerRepository } from '@/aplication/protocols/PlayerRepository'
import { UseCase } from '@/aplication/protocols/UseCase'

export class RegisterPlayer implements UseCase<Input, Output> {
  constructor (
    private readonly codAPI: CodAPI,
    private readonly playerRepository: PlayerRepository
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
    await this.playerRepository.findByEmail(input.email)

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
