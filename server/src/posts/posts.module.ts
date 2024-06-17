import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { Repository, Services } from '../utils/constants';
import { PostController } from './post.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../auth/guard/auth.guard';
import { UsersModule } from '../users/users.module';
import { PostsRepository } from './repository/posts.repository';
import { PrismaModule } from '../utils/database/prisma.module';
import { LikeRepository } from './repository/like.repository';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [PostController],
  providers: [
    {
      provide: Services.POSTS,
      useClass: PostService,
    },
    {
      provide: Repository.POSTS,
      useClass: PostsRepository,
    },
    {
      provide: Repository.LIKE,
      useClass: LikeRepository,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [
    {
      provide: Services.POSTS,
      useClass: PostService,
    },
  ],
})
export class PostsModule {}
