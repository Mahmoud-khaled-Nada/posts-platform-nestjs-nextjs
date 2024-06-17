import { Controller, Get, Inject, UseGuards } from '@nestjs/common';

import { IUserService } from './user';
import { Routes, Services } from 'src/utils/constants';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Auth } from 'src/utils/decorator';
import { User } from '@prisma/client';

@Controller(Routes.USERS)
export class UserController {
  constructor(
    @Inject(Services.USERS) private readonly userService: IUserService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('me')
  async findOne(@Auth() user: User) {
    return {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }
}
