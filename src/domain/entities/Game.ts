export class Game {
  private readonly id: string
  private readonly name: string
  private readonly type: string
  private readonly image: string
  private readonly mode: string

  constructor (
    id: string,
    name: string,
    type: string,
    image: string,
    mode: string
  ) {
    this.id = id
    this.name = name
    this.type = type
    this.image = image
    this.mode = mode
  }
}
