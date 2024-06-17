//

import { HttpException, HttpStatus } from '@nestjs/common';

export class UserUnauthorizedException extends HttpException {
  constructor() {
    super('username or password is incorrect', HttpStatus.NOT_FOUND);
  }
}
