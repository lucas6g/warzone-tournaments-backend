import { UseCase } from '@/aplication/protocols/UseCase'

export class AddGame implements UseCase<Input, Output> {
  async execute (input: Input): Promise<Output> {
    return await Promise.resolve({ status: 'created' })
  }
}

type Input = {
  name: string
}
type Output = {
  status: string
}
