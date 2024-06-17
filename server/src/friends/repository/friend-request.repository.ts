import { Inject, Injectable } from '@nestjs/common';
import { Services } from 'src/utils/constants';
import { PrismaService } from 'src/utils/database/prisma.service';
import { userSelect } from 'src/utils/selectors';
import { SetFriendRequestDetails } from 'src/utils/types';

@Injectable()
export class FriendRequestRepository {
  constructor(
    @Inject(Services.PRISMA)
    private readonly prisma: PrismaService,
  ) {}

  async createFriendRequest({ senderId, receiverId }: SetFriendRequestDetails) {
    return await this.prisma.friendRequest.create({
      data: {
        senderId,
        receiverId,
      },
      include: {
        sender: userSelect,
        receiver: userSelect,
      },
    });
  }

  async findOneBy({ senderId, receiverId }: SetFriendRequestDetails) {
    return await this.prisma.friendRequest.findFirst({
      where: {
        senderId: senderId,
        receiverId: receiverId,
      },
      include: {
        sender: userSelect,
        receiver: userSelect,
      },
    });
  }

  async requests(userId: number) {
    return await this.prisma.friendRequest.findMany({
      where: {
        OR: [{ receiverId: userId }, { senderId: userId }],
      },
      include: {
        sender: userSelect,
        receiver: userSelect,
      },
    });
  }

  async deleteFriendRequest(id: number) {
    return await this.prisma.friendRequest.delete({
      where: {
        id: id,
      },
    });
  }
}
