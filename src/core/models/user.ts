import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsString, MinLength } from 'class-validator';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column()
  email: string;

  @Column()
  password: string;
}

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
