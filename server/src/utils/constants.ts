export enum Routes {
  AUTH = 'auth',
  USERS = 'users',
  POSTS = 'posts',
  COMMENT = 'comment',
  FRIEND = 'friends',
  FRIEND_REQUEST = 'friends-request',
  NOTIFICATION = 'notification',
}

export enum Services {
  PRISMA = 'PRISMA_SERVICE',
  AUTH = 'AUTH_SERVICE',
  USERS = 'USERS_SERVICE',
  POSTS = 'POSTS_SERVICE',
  COMMENT = 'COMMENT_SERVICE',
  GATEWAY_SESSION_MANAGER = 'GATEWAY_SESSION_MANAGER',
  FRIEND = 'FRIEND_SERVICE',
  FRIEND_REQUEST = 'FRIEND_REQUEST_SERVICE',
  NOTIFICATION = 'NOTIFICATION_SERVICE',
}

export enum Repository {
  POSTS = 'POSTS_REPOSITORY',
  LIKE = 'LIKE_REPOSITORY',
  FRIEND = 'FRIEND_REPOSITORY',
  FRIEND_REQUEST = 'FRIEND_REQUEST_REPOSITORY',
}

export enum WebsocketEvents {
  FRIEND_REQUEST_ACCEPTED = 'onFriendRequestAccepted',
  FRIEND_REQUEST_REJECTED = 'onFriendRequestRejected',
  VIDEO_CALL_REJECTED = 'onVideoCallRejected',
  VOICE_CALL_ACCEPTED = 'onVoiceCallAccepted',
  VOICE_CALL_HANG_UP = 'onVoiceCallHangUp',
  VOICE_CALL_REJECTED = 'onVoiceCallRejected',
}
