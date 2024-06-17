import { Inject, Injectable } from '@nestjs/common';
import { IUserService } from 'src/users/user';
import { Repository, Services } from 'src/utils/constants';
import { IFriendService } from '../interfaces/friend';
import { Friends } from '@prisma/client';
import { FriendRepository } from '../repository/friend.repository';

@Injectable()
export class FriendService implements IFriendService {
  constructor(
    @Inject(Services.USERS)
    private readonly userService: IUserService,
    @Inject(Repository.FRIEND)
    private readonly friendRepository: FriendRepository,
  ) {}

  getFriends(userId: number): Promise<Friends[]> {
    try {
      return this.friendRepository.friends(userId);
    } catch (error) {
      console.log(error);
    }
  }
}
