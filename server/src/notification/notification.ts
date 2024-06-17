import { Prisma } from '@prisma/client';
import { NotificationType } from 'src/utils/types';

export interface INotification {
  addNotification(
    notifiableId: number,
    notifiableType: string,
    data: Prisma.JsonValue,
  ): Promise<NotificationType>;
  readNotifications(userId: number): Promise<NotificationType[]>;
  deleteNotification(notificationId: string): Promise<void>;
}
