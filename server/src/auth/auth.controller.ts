import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { Public } from './public/public-strategy';
import { Routes, Services } from '../utils/constants';
import { IAuthService } from './auth';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginParma } from '../utils/types';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(@Inject(Services.AUTH) private authService: IAuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() payload: LoginParma) {
    return this.authService.login(payload);
  }
}
