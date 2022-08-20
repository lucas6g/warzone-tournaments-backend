export class Game {
  constructor (
    private readonly id: string,
    private readonly name: string,
    private readonly image: string
  ) {}

  getName (): string {
    return this.name
  }
}
