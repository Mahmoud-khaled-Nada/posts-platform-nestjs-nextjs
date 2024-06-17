import { User } from '@prisma/client';
import { Request } from 'express';
import { Socket } from 'socket.io';

import { Prisma } from '@prisma/client';



export interface AuthenticatedRequest extends Request {
  user: User;
}





export interface AuthenticatedSocket extends Socket {
  socket: unknown;
  [x: string]: unknown;
  user?: User;
}


export type LoginParma = {
  username: string;
  password: string;
};

export interface AuthDetails {
  access_token: string;
  user: UserDetails;
}

export interface UserDetails {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  password?: string;
}

export type CreatePostParams = {
  content: string;
  userId: number;
};

export type LikeParams = {
  userId: number;
  postId: number;
};

export type AddLikeEvent = {
  id: number;
  userId: number;
  postId: number;
  post: {
    userId: number;
  };
};

export type CommentParams = {
  creator: number;
  postId: number;
  content: string;
};

export type CommentEvent = {
  comment: {
    forEach(arg0: (comment: any) => void): unknown;
    user: {
      id: number;
      firstName: string;
      lastName: string;
    };
  };
  postId: number;
};

export type SendFriendRequestParams = {
  receiverUsername: string;
  senderId: number;
};

export type FriendRequestActionParams = {
  senderId: number;
  receiverId: number;
};

export type RejectFriendRequestParams = {
  requestId: number;
  userId: number;
};

export type SetFriendRequestDetails = {
  senderId: number;
  receiverId: number;
};
export type FriendParams = {
  senderId: number;
  receiverId: number;
};


export type NotificationType = {
  id: string;
  notifiableId: number;
  notifiableType: string;
  data: Prisma.JsonValue;
  readAt: Date | null;
  createdAt: Date;
};


