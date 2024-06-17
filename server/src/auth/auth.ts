
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthDetails, LoginParma } from 'src/utils/types';

export interface IAuthService {
  login(payload: LoginParma): Promise<AuthDetails>;
  register(payload: CreateUserDto): Promise<User>;
}
