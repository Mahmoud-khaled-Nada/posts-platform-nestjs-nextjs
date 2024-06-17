import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { IUserService } from 'src/users/user';
import { Services } from 'src/utils/constants';
import { AuthDetails, LoginParma } from 'src/utils/types';
import { IAuthService } from './auth';
import { User } from '@prisma/client';
import { AlreadyException, UserUnauthorizedException } from 'src/exceptions';
@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.USERS) private readonly userService: IUserService,
    private jwtService: JwtService,
  ) {}

  async login({ username, password }: LoginParma): Promise<AuthDetails> {
    const user = await this.userService.findOneByUsername(username);
    if (!user || user.password !== password)
      throw new UserUnauthorizedException();

    const data = {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    return {
      access_token: await this.jwtService.signAsync(data),
      user: data,
    };
  }

  async register(payload: CreateUserDto): Promise<User> {
    const isExist = await this.userService.findOneByUsername(payload.username);
    if (isExist) throw new AlreadyException('User already exists');
    const user = await this.userService.create(payload);
    return user;
  }
}
