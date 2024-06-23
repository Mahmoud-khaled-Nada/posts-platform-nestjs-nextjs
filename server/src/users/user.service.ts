import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Services } from 'src/utils/constants';
import { IUserService } from './user';
import { User } from '@prisma/client';
import { PrismaService } from '../utils/database/prisma.service';
import { UpdateUserProfileParams } from 'src/utils/types';
import { generateUUIDV4 } from 'src/utils/helpers';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(Services.PRISMA) private readonly prisma: PrismaService,
  ) {}

  async findUser(id: number): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findOneByUsername(username: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({ data: createUserDto });
  }

  async createProfileOrUpdate(user: User, params: UpdateUserProfileParams) {
    console.log('CreateProfileOrUpdate');
    const profile = await this.userProfile(user.id);
    if (!profile) {
      console.log('User has no profile. Creating...');
      return this.createProfile(user, params);
    }
    console.log('User has profile. Updating...');
    return this.updateProfile(user.id, params);
  }

  async createProfile(user: User, params: UpdateUserProfileParams) {
    return this.prisma.profile.create({
      data: {
        userId: user.id,
        about: params.about,
        avatar: await this.uploadFile(params.avatar),
        banner: await this.uploadFile(params.banner),
      },
    });
  }

  async updateProfile(userId: number, params: UpdateUserProfileParams) {
    const avatarUrl = params.avatar
      ? await this.uploadFile(params.avatar)
      : undefined;
    const bannerUrl = params.banner
      ? await this.uploadFile(params.banner)
      : undefined;
    return this.prisma.profile.updateMany({
      where: { userId: userId },
      data: {
        about: params.about,
        avatar: avatarUrl,
        banner: bannerUrl,
      },
    });
  }

  getPublicUrl(filePath: string): string {
    return `http://localhost:7000/${filePath.replace(/\\/g, '/')}`;
  }

  async userProfile(userId: number) {
    return await this.prisma.profile.findFirst({
      where: { userId: userId },
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    if (!file) return null;
    const key = generateUUIDV4();
    const filePath = path.join('uploads', key + '-' + file.originalname);
    await fs.promises.writeFile(filePath, file.buffer);
    return filePath;
  }

  async currentUser(user: User): Promise<User | any> {
    const profile = await this.userProfile(user.id);

    return {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      profile: profile
        ? {
            about: profile.about,
            avatar: this.getPublicUrl(profile.avatar),
            banner: this.getPublicUrl(profile.banner),
          }
        : undefined,
    };
  }
}
