import { UseCase } from '@/aplication/protocols/UseCase'

export class RegisterPlayer implements UseCase<Input, Output> {
  async execute (input: Input): Promise<Output> {
    return await Promise.resolve({ accessToken: 'anyAccessToken' })
  }
}

type Input = {
  gamertag: string
  platform: string
  email: string
  password: string
  pixKey: string
}

type Output = {
  accessToken: string
}
