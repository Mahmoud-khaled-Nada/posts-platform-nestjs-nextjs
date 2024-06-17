import { Inject, Injectable } from '@nestjs/common';
import { Friends } from '@prisma/client';
import { Services } from 'src/utils/constants';
import { PrismaService } from 'src/utils/database/prisma.service';
import { userSelect } from 'src/utils/selectors';
import { FriendParams, FriendRequestActionParams } from 'src/utils/types';

@Injectable()
export class FriendRepository {
  constructor(
    @Inject(Services.PRISMA)
    private readonly prisma: PrismaService,
  ) {}

  async transfarToFriends({ receiverId, senderId }: FriendRequestActionParams) {
    return await this.prisma.friends.create({
      data: {
        receiverId: receiverId,
        senderId: senderId,
      },
    });
  }

  async friends(userId: number): Promise<Friends[]> {
    return await this.prisma.friends.findMany({
      where: {
        OR: [{ receiverId: userId }, { senderId: userId }],
      },
      include: {
        sender: userSelect,
        receiver: userSelect,
      },
    });
  }

  async findOneBy({ senderId, receiverId }: FriendParams): Promise<Friends> {
    return await this.prisma.friends.findFirst({
      where: {
        receiverId: receiverId,
        senderId: senderId,
      },
      include: {
        sender: userSelect,
        receiver: userSelect,
      },
    });
  }
}
