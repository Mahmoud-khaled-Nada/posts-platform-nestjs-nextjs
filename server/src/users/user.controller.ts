import {
  Body,
  Controller,
  Get,
  Inject,
  Patch,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { IUserService } from './user';
import { Routes, Services, UserProfileFileFields } from 'src/utils/constants';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Auth } from 'src/utils/decorator';
import { User } from '@prisma/client';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UpdateUserProfileDto } from './dto/UpdateUserProfileDto';
import { UpdateUserProfileParams, UserProfileFiles } from 'src/utils/types';

@Controller(Routes.USERS)
export class UserController {
  constructor(
    @Inject(Services.USERS) private readonly userService: IUserService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('me')
  async findOne(@Auth() user: User) {
    return await this.userService.currentUser(user);
  }

  @Patch('/profiles')
  @UseInterceptors(FileFieldsInterceptor(UserProfileFileFields))
  async updateUserProfile(
    @Auth() user: User,
    @UploadedFiles()
    files: UserProfileFiles,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
  ) {
    console.log('Inside Users/Profiles Controller');
    const params: UpdateUserProfileParams = {};
    updateUserProfileDto.about && (params.about = updateUserProfileDto.about);
    files.banner && (params.banner = files.banner[0]);
    files.avatar && (params.avatar = files.avatar[0]);
    return this.userService.createProfileOrUpdate(user, params);
  }
}
