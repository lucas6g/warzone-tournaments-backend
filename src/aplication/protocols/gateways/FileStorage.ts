export interface FileStorage {
  upload: (fileName: string) => Promise<string>
}
