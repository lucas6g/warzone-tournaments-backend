import { CodAPI } from '@/aplication/protocols/CodAPI'
import { UseCase } from '@/aplication/protocols/UseCase'

export class RegisterPlayer implements UseCase<Input, Output> {
  constructor (private readonly codAPI: CodAPI) {}

  async execute (input: Input): Promise<Output> {
    await this.codAPI.hasAccount(input.gamertag, input.platform)

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
