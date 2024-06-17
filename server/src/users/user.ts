import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';

export interface IUserService {
  create(createUserDto: CreateUserDto): Promise<User>;
  findUser(id: number): Promise<User>;
  findOneByUsername(username: string): Promise<User | null>;
}
