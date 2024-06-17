import { Inject, Injectable } from '@nestjs/common';
import { Services } from '../../utils/constants';
import { PrismaService } from '../../utils/database/prisma.service';
import { CommentParams, LikeParams } from 'src/utils/types';
import { userSelect } from 'src/utils/selectors';

@Injectable()
export class LikeRepository {
  constructor(
    @Inject(Services.PRISMA)
    private readonly prisma: PrismaService,
  ) {}

  addLike({ userId, postId }: LikeParams) {
    return this.prisma.like.create({
      data: { userId, postId },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        post: {
          select: {
            userId: true,
          },
        },
      },
    });
  }

  async checkIsLikePostAlreadyAdded(parmas: LikeParams) {
    return await this.prisma.post.findMany({
      where: {
        likes: {
          some: {
            userId: parmas.userId,
            postId: parmas.postId,
          },
        },
      },
    });
  }

  async postComment({ creator, postId, content }: CommentParams) {
    return await this.prisma.comment.create({
      data: {
        userId: creator,
        postId: postId,
        content: content,
      },
      select: {
        user: userSelect,
        content: true,
        postId: true
      },
    });
  }

  async getComments(postId: number) {
    return await this.prisma.comment.findMany({
      where: {
        postId: postId,
      },
      select: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }
}
