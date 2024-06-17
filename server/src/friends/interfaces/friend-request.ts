import { FriendRequest } from '@prisma/client';
import {
  SendFriendRequestParams,
  FriendRequestActionParams,
} from 'src/utils/types';

export interface IFriendRequestService {
  createFriendRequest(params: SendFriendRequestParams): Promise<FriendRequest| any>;
  displayRequest(userId: number): Promise<FriendRequest[] | null>;
  acceptFriendRequest(params: FriendRequestActionParams);
  rejectFriendRequest(requestId: number);
}
