import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Repository, Services } from 'src/utils/constants';
import { PrismaModule } from 'src/utils/database/prisma.module';
import { FriendRequestService } from './services/friend-request.service';
import { FriendRequestRepository } from './repository/friend-request.repository';
import { FriendRequestController } from './controllers/friend-request.controller';
import { UsersModule } from '../users/users.module';
import { FriendRepository } from './repository/friend.repository';
import { FriendService } from './services/friend.service';
import { FriendController } from './controllers/friend.controller';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [PrismaModule, UsersModule, NotificationModule],
  controllers: [FriendRequestController, FriendController],
  providers: [
    {
      provide: Services.FRIEND,
      useClass: FriendService,
    },
    {
      provide: Repository.FRIEND,
      useClass: FriendRepository,
    },

    {
      provide: Services.FRIEND_REQUEST,
      useClass: FriendRequestService,
    },
    {
      provide: Repository.FRIEND_REQUEST,
      useClass: FriendRequestRepository,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [
    {
      provide: Services.FRIEND,
      useClass: FriendService,
    },
    {
      provide: Services.FRIEND_REQUEST,
      useClass: FriendRequestService,
    },
  ],
})
export class FriendsModule {}
