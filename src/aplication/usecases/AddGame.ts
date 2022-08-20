import { IDGenerator } from '@/aplication/protocols/IDGenerator'
import { UseCase } from '@/aplication/protocols/UseCase'

export class AddGame implements UseCase<Input, Output> {
  constructor (private readonly idGenerator: IDGenerator) {}

  async execute (input: Input): Promise<Output> {
    this.idGenerator.generate()
    return await Promise.resolve({ status: 'created' })
  }
}

type Input = {
  name: string
}
type Output = {
  status: string
}
