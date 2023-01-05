export interface UseCase<Input, Output = any> {
  execute: (input: Input) => Promise<Output>
}
