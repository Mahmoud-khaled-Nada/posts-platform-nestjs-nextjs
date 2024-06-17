import { WebSocketAdapter } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { verify } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { AuthenticatedSocket } from 'src/utils/types';

const prisma = new PrismaClient();

export class WsAdapter extends IoAdapter implements WebSocketAdapter {
  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, options);
    server.use(async (socket: AuthenticatedSocket, next) => {
      const token: string | any = socket.handshake.auth.access_token;
      if (!token)
        return next(new Error('Not Authenticated. No token provided'));

      try {
        const decodedToken: any = verify(token, process.env.JWT_SECRET_KEY);
        const userId = decodedToken.id;

        // Fetch user information from the database using Prisma
        const user = await prisma.user.findUnique({
          where: { id: userId },
        });

        if (!user) return next(new Error('No session found'));

        socket.user = user;
        next();
      } catch (error) {
        return next(new Error('Error verifying token'));
      }
    });

    return server;
  }
}
