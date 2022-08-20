import { AddGame } from '@/aplication/usecases/AddGame'

describe('AddGame', () => {
  it('should add a new game', async () => {
    const sut = new AddGame()

    const input = {
      name: 'warzone'
    }

    const output = await sut.execute(input)
    expect(output.status).toBe('created')
  })
})
