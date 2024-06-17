import { FriendRequestDetails, FriendsDetails, User } from "./types";


export const formatRequestType = (userId: number, { senderId }: FriendRequestDetails): string =>
  userId === senderId ? "Outgoing request" : "Incoming request";

export const formatRequestName = (userId: number, { senderId, receiver, sender }: FriendRequestDetails): string =>
  userId === senderId ? `${receiver.firstName} ${receiver.lastName}` : `${sender.firstName} ${sender.lastName}`;

export const formatFullName = ({ firstName, lastName }: User): string => `${firstName} ${lastName}`;

export const formatFriendFullName = (userId: number, { senderId, receiver, sender }: FriendsDetails): string =>
  userId === senderId ? `${receiver.firstName} ${receiver.lastName}` : `${sender.firstName} ${sender.lastName}`;
