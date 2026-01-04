export interface IVerifyEmailChangeUseCase {
  execute(userId: string, otp: string): Promise<{ message: string }>;
}
