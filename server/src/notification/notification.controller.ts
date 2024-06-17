import { Controller, Get, Inject, Param } from '@nestjs/common';
import { INotification } from './notification';
import { Routes, Services } from '../utils/constants';
import { Auth } from 'src/utils/decorator';
import { User } from '@prisma/client';

@Controller(Routes.NOTIFICATION)
export class NotificationController {
  constructor(
    @Inject(Services.NOTIFICATION)
    private readonly notificationService: INotification,
  ) {}

  @Get()
  async readNotifications(@Auth() { id: userId }: User) {
    return await this.notificationService.readNotifications(userId);
  }
}
