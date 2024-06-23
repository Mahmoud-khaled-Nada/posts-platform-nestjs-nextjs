export type ContextMenuEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;
export type DivMouseEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;
export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type DragEvent = React.DragEvent<HTMLTextAreaElement>;
export type ClipboardEvent = React.ClipboardEvent<HTMLTextAreaElement>;
export type FormEvent = React.FormEvent<HTMLFormElement>;

export interface ChildrenType {
  children: React.ReactNode;
}

export type AuthenticationRouterProps = {
  children?: React.ReactNode;
};

export type LoginParams = {
  username: string;
  password: string;
};

export type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  profile: Profile;
};

export type Profile = Partial<{
  about: string | null;
  avatar: string | null;
  banner: string | null;
}>;

export type PostParams = {
  content: string;
};

export type CommentParams = {
  content: string;
};

export type AudioPostParam = {
  audioContent?: Blob;
};

export type UserType = {
  user: User | null;
};

export type PostsDetails = {
  id: number;
  userId: number;
  content: string;
  createdAt: string;
  user: User;
  likes: UserType[];
  comments: CommentDetails[];
  _count: {
    comments: number;
    likes: number;
  };
};

export type PostFooterDetails = {
  postId: number;
  likes: UserType[];
  comments: CommentDetails[];
  counters: {
    comments: number;
    likes: number;
  };
};

export type PostsSatetType = {
  posts: PostsDetails[];
};

export type AddLikeParams = {
  postId: number;
  userId: number;
};

export type CommentDetails = {
  user: User;
  content: string;
};

export type FriendRequestDetails = {
  id: number;
  senderId: number;
  receiverId: number;
  status: string;
  createdAt: string;
  sender: User;
  receiver: User;
};

export type FriendRequestState = {
  friendRequests: FriendRequestDetails[];
};

export type FriendsDetails = {
  id: number;
  senderId: number;
  receiverId: number;
  createdAt: string;
  sender: User;
  receiver: User;
};

export type FriendState = {
  friends: FriendsDetails[];
};

export type FriendRequestParams = {
  username: string;
};

export type SidebarTabPrpos = {
  selected: boolean;
};

export type NotificationsListItemPrpos = {
  selected: boolean;
};

export type NotificationDetails = {
  id: string;
  notifiableId: number;
  notifiableType: string;
  data: JSON | any;
  readAt: string | null;
  createdAt: string;
};

export type NotificationState = {
  notifications: NotificationDetails[];
};

export type SettingsSidebarItemProps = {
  isActive: boolean;
};

export type UserBannerProps = {
  backgroundUrl: string;
  // backgroundColor: string;
};
