import { Module } from '@nestjs/common';
import { Services } from '../utils/constants';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../utils/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    {
      provide: Services.USERS,
      useClass: UserService,
    },
  ],
  exports: [
    {
      provide: Services.USERS,
      useClass: UserService,
    },
  ],
})
export class UsersModule {}
