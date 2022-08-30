import { AcceptTeamInvite } from '@/aplication/usecases/AcceptTeamInvite'

describe('AcceptTeamInvite', () => {
  it('should accepte team invite', async () => {
    const sut = new AcceptTeamInvite()

    const input = {
      teamInviteId: 'anyId'
    }

    const output = await sut.execute(input)

    expect(output.status).toBe('accepted')
  })
})
