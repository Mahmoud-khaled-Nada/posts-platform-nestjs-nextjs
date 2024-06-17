import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GatewayModule } from './gateway/gateway.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PrismaModule } from './utils/database/prisma.module';
import { FriendsModule } from './friends/friends.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot(),
    PrismaModule,
    PostsModule,
    UsersModule,
    AuthModule,
    GatewayModule,
    FriendsModule,
    NotificationModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
