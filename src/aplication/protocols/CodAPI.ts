export interface CodAPI {
  hasAccount: (gamertag: string, platform: string) => Promise<boolean>
}
