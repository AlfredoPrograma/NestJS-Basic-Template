import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;
}

export interface CreateUserDto {
  email: string;
  password: string;
}

export type SignInUserDto = CreateUserDto;

export interface SignInResponse {
  user: Pick<User, 'id' | 'email'>;
  accessToken: string;
}
