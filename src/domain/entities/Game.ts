export default class Game {
  private readonly id: string
  private readonly name: string
  private readonly image: string
  private readonly type: string
  private readonly mode: string

  constructor (
    id: string,
    name: string,
    image: string,
    type: string,
    mode: string

  ) {
    this.id = id
    this.name = name
    this.image = image
    this.type = type
    this.mode = mode
  }

  getName (): string {
    return this.name
  }

  getImage (): string {
    return this.image
  }
}
