import { IsNotEmpty } from 'class-validator';

export class CreateFriendRequestDto {
  @IsNotEmpty()
  username: string;
}

export class FriendRequestActionDto {
  // @IsNotEmpty()
  senderId: number;
}
