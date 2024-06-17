

import { HttpException, HttpStatus } from '@nestjs/common';

export class SendFriendRequestToYourselfException extends HttpException {
  constructor() {
    super('You cannot send a friend request to yourself', HttpStatus.BAD_REQUEST);
  }
}