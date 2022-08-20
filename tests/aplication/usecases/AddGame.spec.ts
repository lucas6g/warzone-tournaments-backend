import { IDGenerator } from '@/aplication/protocols/IDGenerator'
import { AddGame } from '@/aplication/usecases/AddGame'
import { mock, MockProxy } from 'jest-mock-extended'

describe('AddGame', () => {
  let idGenerator: MockProxy<IDGenerator>

  beforeEach(() => {
    idGenerator = mock<IDGenerator>()
  })

  it('should add a new game', async () => {
    const sut = new AddGame(idGenerator)

    const input = {
      name: 'warzone'
    }

    const output = await sut.execute(input)
    expect(output.status).toBe('created')
  })
  it('should call id generator', async () => {
    const sut = new AddGame(idGenerator)

    const input = {
      name: 'warzone'
    }

    await sut.execute(input)
    expect(idGenerator.generate).toHaveBeenCalledTimes(1)
  })
})
