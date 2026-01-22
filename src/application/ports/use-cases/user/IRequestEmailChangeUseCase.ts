export interface IRequestEmailChangeUseCase {
  execute(userId: string, newEmail: string): Promise<{ message: string }>;
}
