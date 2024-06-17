import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticatedRequest } from './types';

export const Auth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = <AuthenticatedRequest>ctx.switchToHttp().getRequest();
    return request.user;
  },
);