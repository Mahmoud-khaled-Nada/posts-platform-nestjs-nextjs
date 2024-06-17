import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { IFriendRequestService } from '../interfaces/friend-request';
import { Auth } from 'src/utils/decorator';
import { User } from '@prisma/client';
import { CreateFriendRequestDto } from '../dtos/friend-request.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller(Routes.FRIEND_REQUEST)
export class FriendRequestController {
  constructor(
    @Inject(Services.FRIEND_REQUEST)
    private readonly friendRequestService: IFriendRequestService,
    private readonly events: EventEmitter2,
  ) {}

  @Post('create')
  async createFriendRequest(
    @Body() { username: receiverUsername }: CreateFriendRequestDto,
    @Auth() { id: senderId }: User,
  ) {
    const params = { receiverUsername, senderId };
    const response = await this.friendRequestService.createFriendRequest(params);
    this.events.emit('create.friend.request', response);
    return response;
  }

  @Get('requests')
  async friendRequests(@Auth() { id: userId }: User) {
    return this.friendRequestService.displayRequest(userId);
  }

  @Post(':senderId/accept')
  async acceptFriend(
    @Param('senderId', ParseIntPipe) senderId: number,
    @Auth() { id: receiverId }: User,
  ) {
    const params = { senderId, receiverId };
    const response = await this.friendRequestService.acceptFriendRequest(params);
    this.events.emit('accept.friend.request', response);
    return response;
  }

  @Delete(':id/reject')
  async rejectFriend(@Param('id', ParseIntPipe) id: number) {
    return this.friendRequestService.rejectFriendRequest(id);
  }
}
