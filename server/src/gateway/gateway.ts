/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Services } from '../utils/constants';
import { IGatewaySessionManager } from './gateway.session';
import { AuthenticatedSocket } from 'src/utils/types';
import { OnEvent } from '@nestjs/event-emitter';
import { AddLikeEvent, CommentEvent } from 'src/utils/types';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
    credentials: true,
  },
  pingInterval: 10000,
  pingTimeout: 15000,
})
export class MessagingGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    @Inject(Services.GATEWAY_SESSION_MANAGER)
    readonly sessions: IGatewaySessionManager,
  ) {}

  @WebSocketServer()
  server: Server;

  handleConnection(socket: AuthenticatedSocket, ...args: any[]) {
    this.sessions.setUserSocket(socket.user.id, socket);
    socket.emit('connected', {});
  }

  handleDisconnect(socket: AuthenticatedSocket) {
    // console.log(`${socket.user.username} disconnected.`);
    this.sessions.removeUserSocket(socket.user.id);
  }

  @SubscribeMessage('createMessage')
  handleCreateMessage(@MessageBody() data: any) {
    const authorSocket = this.sessions.getUserSocket(data.user.id);
    console.log(authorSocket.user.firstName);
    console.log('createMessage data');
    console.log(JSON.stringify(data));
  }

  @OnEvent('post.create')
  async handleCreatePost(payload: any) {
    // const { userId } = payload;
    // const user = this.sessions.getUserSocket(userId);
    // if (user) user.emit('onPostCreate', payload);
    // socket.emit('onPostCreate', payload);
    this.server.emit('onPostCreate', payload);
  }

  // @SubscribeMessage('getOnlineGroupUsers')
  // async handleGetOnlineGroupUsers(
  //   @MessageBody() data: any,
  //   @ConnectedSocket() socket: AuthenticatedSocket,
  // ) {
  //   const group = await this.groupsService.findGroupById(
  //     parseInt(data.groupId),
  //   );
  //   if (!group) return;
  //   const onlineUsers = [];
  //   const offlineUsers = [];
  //   group.users.forEach((user) => {
  //     const socket = this.sessions.getUserSocket(user.id);
  //     socket ? onlineUsers.push(user) : offlineUsers.push(user);
  //   });
  //   socket.emit('onlineGroupUsersReceived', { onlineUsers, offlineUsers });
  // }

  @OnEvent('like.create')
  async handleAddLike(payload: AddLikeEvent) {
    const { userId } = payload.post;
    const user = this.sessions.getUserSocket(userId);
    if (user) user.emit('onLikeAdd', payload);
  }

  @OnEvent('comment.create')
  async handleAddComment(payload: any) {
    const uniqueUserIds = [
      ...new Set(
        payload.post.comments.map((userComment: any) => userComment.userId),
      ),
    ];

    const userSockets = uniqueUserIds
      .filter((userId) => userId !== payload.user.id)
      .map((userId: number) => this.sessions.getUserSocket(userId));

    userSockets.forEach((userSocket) => {
      if (userSocket) userSocket.emit('onCommentAdd', payload.user);
    });
  }

  @OnEvent('create.friend.request')
  async handleCreateFriendRequest(payload: any) {
    const { receiverId } = payload;
    const receiverSocket = this.sessions.getUserSocket(receiverId);
    receiverSocket && receiverSocket.emit('onCreateFriendRequest', payload);
  }

  @OnEvent('accept.friend.request')
  async handleAcceptFriendRequest(payload: any) {
    const { senderId } = payload.friendRequest;
    const senderSocket = this.sessions.getUserSocket(senderId);
    senderSocket && senderSocket.emit('onAcceptFriendRequest', payload);
  }
}
