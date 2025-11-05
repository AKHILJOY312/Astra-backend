export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'member';
  projectIds: string[];
  premium: boolean;
  createdAt: Date;
}

export interface CreateUserInput {
  email: string;
  name: string;
  password: string;
}
