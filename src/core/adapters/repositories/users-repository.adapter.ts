export interface UsersRepositoryAdapter {
  create(user: any): Promise<any>;
}
