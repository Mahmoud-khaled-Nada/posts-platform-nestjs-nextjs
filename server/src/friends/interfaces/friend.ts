import { Friends } from '@prisma/client';

export interface IFriendService {
  getFriends(userId: number): Promise<Friends[]>;
}
