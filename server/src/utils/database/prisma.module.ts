import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Services } from '../constants';

@Module({
  providers: [
    {
      provide: Services.PRISMA,
      useClass: PrismaService,
    },
  ],
  exports: [
    {
      provide: Services.PRISMA,
      useClass: PrismaService,
    },
  ],
})
export class PrismaModule {}
