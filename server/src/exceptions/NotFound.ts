import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor(msg?: string) {
    const defaultMessage = 'Exception....';
    const error = msg ? defaultMessage.concat(': ', msg) : defaultMessage;
    super(error, HttpStatus.CONFLICT);
  }
}