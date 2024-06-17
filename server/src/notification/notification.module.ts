import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { Services } from 'src/utils/constants';
import { PrismaModule } from 'src/utils/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [NotificationController],
  providers: [
    {
      provide: Services.NOTIFICATION,
      useClass: NotificationService,
    },
  ],
  exports: [
    {
      provide: Services.NOTIFICATION,
      useClass: NotificationService,
    },
  ],
})
export class NotificationModule {}
