import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserProfileParams } from 'src/utils/types';

export interface IUserService {
  create(createUserDto: CreateUserDto): Promise<User>;
  findUser(id: number): Promise<User>;
  findOneByUsername(username: string): Promise<User | null>;
  createProfileOrUpdate(user: User, params: UpdateUserProfileParams);
  currentUser(user: User): Promise<User>;
}
