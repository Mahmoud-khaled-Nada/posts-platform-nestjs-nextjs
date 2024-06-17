import { Module } from '@nestjs/common';
import { Services } from '../utils/constants';
import { MessagingGateway } from './gateway';
import { GatewaySessionManager } from './gateway.session';
import { PrismaModule } from '../utils/database/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    MessagingGateway,
    {
      provide: Services.GATEWAY_SESSION_MANAGER,
      useClass: GatewaySessionManager,
    },
  ],
  exports: [
    MessagingGateway,
    {
      provide: Services.GATEWAY_SESSION_MANAGER,
      useClass: GatewaySessionManager,
    },
  ],
})
export class GatewayModule {}