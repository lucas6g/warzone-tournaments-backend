export class Player {
  private readonly kdLevel: number

  constructor (kdLevel: number) {
    this.kdLevel = kdLevel
  }

  getKdLevel (): number {
    return this.kdLevel
  }
}
