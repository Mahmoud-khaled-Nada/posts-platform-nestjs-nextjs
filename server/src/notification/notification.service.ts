import { Inject, Injectable } from '@nestjs/common';
import { INotification } from './notification';
import { Services } from 'src/utils/constants';
import { PrismaService } from 'src/utils/database/prisma.service';
import { NotificationType } from 'src/utils/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class NotificationService implements INotification {
  constructor(
    @Inject(Services.PRISMA)
    private readonly prisma: PrismaService,
  ) {}

  async addNotification(
    notifiableId: number,
    notifiableType: string,
    data: Prisma.JsonValue,
  ): Promise<NotificationType> {
    const notification = await this.prisma.notification.create({
      data: {
        notifiableId,
        notifiableType,
        data,
      },
    });
    return notification;
  }

  async readNotifications(userId: number): Promise<NotificationType[]> {
    const notifications = await this.prisma.notification.findMany({
      where: {notifiableId: userId },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return notifications;
  }

  async deleteNotification(notificationId: string): Promise<void> {
    await this.prisma.notification.delete({
      where: {
        id: notificationId,
      },
    });
  }
}
