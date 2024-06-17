import { Inject, Injectable } from '@nestjs/common';
import { IFriendRequestService } from '../interfaces/friend-request';
import { Repository, Services } from '../../utils/constants';
import { FriendRequestRepository } from '../repository/friend-request.repository';
import { IUserService } from 'src/users/user';
import { FriendRepository } from '../repository/friend.repository';
import { INotification } from 'src/notification/notification';
import {
  FriendRequestActionParams,
  SendFriendRequestParams,
} from 'src/utils/types';
import {
  UserNotFoundException,
  SendFriendRequestToYourselfException,
  FriendRequestNotFoundException,
  AlreadyException,
} from '../../exceptions';

@Injectable()
export class FriendRequestService implements IFriendRequestService {
  constructor(
    @Inject(Services.USERS)
    private readonly userService: IUserService,
    @Inject(Services.NOTIFICATION)
    private readonly notificationService: INotification,
    @Inject(Repository.FRIEND_REQUEST)
    private readonly friendRequestRepository: FriendRequestRepository,
    @Inject(Repository.FRIEND)
    private readonly friendRepository: FriendRepository,
  ) {}

  async createFriendRequest({
    senderId,
    receiverUsername,
  }: SendFriendRequestParams) {
    const user = await this.userService.findOneByUsername(receiverUsername);
    if (!user) throw new UserNotFoundException();

    if (senderId === user.id) throw new SendFriendRequestToYourselfException();

    const isFriend = await this.friendRepository.findOneBy({
      senderId,
      receiverId: user.id,
    });

    if (isFriend) throw new AlreadyException('You are already friends');

    const isExist = await this.friendRequestRepository.findOneBy({
      senderId,
      receiverId: user.id,
    });

    if (isExist) throw new AlreadyException('You already requested');

    const createFriendRequest =
      await this.friendRequestRepository.createFriendRequest({
        senderId,
        receiverId: user.id,
      });
    // Add notification for the friend request
    await this.notificationService.addNotification(
      createFriendRequest.receiverId,
      'friend-request',
      {
        status: createFriendRequest.status,
        senderId: createFriendRequest.senderId,
        sender: createFriendRequest.sender,
        receiver: createFriendRequest.receiver,
      },
    );

    return createFriendRequest;
  }

  displayRequest(userId: number) {
    return this.friendRequestRepository.requests(userId);
  }

  async rejectFriendRequest(requestId: number) {
    try {
      await this.friendRequestRepository.deleteFriendRequest(requestId);
      return {
        id: requestId,
        message: 'Friend request deleted successfully',
      };
    } catch (error) {
      throw new Error('Failed to delete friend request');
    }
  }

  async acceptFriendRequest({
    receiverId,
    senderId,
  }: FriendRequestActionParams) {
    const friendRequest = await this.friendRequestRepository.findOneBy({
      receiverId,
      senderId,
    });
    if (!friendRequest) throw new FriendRequestNotFoundException();

    await this.friendRepository.transfarToFriends({ receiverId, senderId });

    await this.friendRequestRepository.deleteFriendRequest(friendRequest.id);

    return {
      friendRequest,
      message: 'Friend request accepted successfully',
    };
  }
}
