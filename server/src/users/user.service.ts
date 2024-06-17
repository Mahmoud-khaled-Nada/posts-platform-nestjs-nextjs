import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Services } from 'src/utils/constants';
import { IUserService } from './user';
import { User } from '@prisma/client';
import { PrismaService } from '../utils/database/prisma.service';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(Services.PRISMA) private readonly prisma: PrismaService,
  ) {}
  async findUser(id: number): Promise<User> {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { username: username },
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({
      data: {
        ...createUserDto,
      },
    });
  }
}
