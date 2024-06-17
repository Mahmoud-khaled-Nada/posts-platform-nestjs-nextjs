import { Inject, Injectable } from '@nestjs/common';
import { Services } from 'src/utils/constants';
import { PrismaService } from 'src/utils/database/prisma.service';
import { userSelect } from 'src/utils/selectors';
import { CreatePostParams } from 'src/utils/types';

@Injectable()
export class PostsRepository {
  constructor(
    @Inject(Services.PRISMA)
    private readonly prisma: PrismaService,
  ) {}

  async createNewPost({content, userId}: CreatePostParams) {
    return await this.prisma.post.create({
      data: {
        content: content,
        user: {
          connect: {
            id: userId,
          },
        },
      },
      select: {
        id: true,
        userId: true,
        content: true,
        createdAt: true,
        user: userSelect,
      }
    });
  }

  async getAllPosts() {
    return await this.prisma.post.findMany({
      select: {
        id: true,
        userId: true,
        content: true,
        createdAt: true,
        user: userSelect,
        _count: {
          select: { likes: true, comments: true },
        },
        likes: {
          select: {
            user: userSelect,
          },
        },
        comments: {
          select: {
            user: userSelect,
            content: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findPost(postId: number) {
    return this.prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        id: true,
        userId: true,
        content: true,
        createdAt: true,
      },
    });
  }
}
