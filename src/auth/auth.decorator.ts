import { SetMetadata, createParamDecorator } from '@nestjs/common';
import type { CustomDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { UserSession } from 'src/auth/auth.guard';

/**
 * Marks a route or a controller as public, allowing unauthenticated access.
 * When applied, the AuthGuard will skip authentication checks.
 */
export const Public = (): CustomDecorator<string> =>
  SetMetadata('PUBLIC', true);

/**
 * Marks a route or a controller as having optional authentication.
 * When applied, the AuthGuard will allow the request to proceed
 * even if no session is present.
 */
export const Optional = (): CustomDecorator<string> =>
  SetMetadata('OPTIONAL', true);

/**
 * Parameter decorator that extracts the user session from the request.
 * Provides easy access to the authenticated user's session data in controller methods.
 */
export const Session: ReturnType<typeof createParamDecorator> =
  createParamDecorator((_data: unknown, context: ExecutionContext): unknown => {
    const request: Request & { session: UserSession | null } = context
      .switchToHttp()
      .getRequest();
    return request.session;
  });
