import { Controller, Get, Inject } from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { IFriendService } from '../interfaces/friend';
import { Auth } from 'src/utils/decorator';
import { User } from '@prisma/client';

@Controller(Routes.FRIEND)
export class FriendController {
  constructor(
    @Inject(Services.FRIEND)
    private readonly friendService: IFriendService,
  ) {}

  @Get('')
  async showFriends(@Auth() { id: userId }: User) {
    return this.friendService.getFriends(userId)
  }
}
