import { Inject, Injectable } from '@nestjs/common';
import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { APIError, type getSession } from 'better-auth/api';
import { fromNodeHeaders } from 'better-auth/node';
import { Request } from 'express';
import { BetterAuthService } from 'src/auth/better-auth.service';

/**
 * Type representing a valid user session after authentication
 * Excludes null and undefined values from the session return type
 */
export type UserSession = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getSession>>>
>;

/**
 * NestJS guard that handles authentication for protected routes
 * Can be configured with @Public() or @Optional() decorators to modify authentication behavior
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(Reflector)
    private readonly reflector: Reflector,

    private betterAuthService: BetterAuthService,
  ) {}

  /**
   * Validates if the current request is authenticated
   * Attaches session and user information to the request object
   * @param context - The execution context of the current request
   * @returns True if the request is authorized to proceed, throws an error otherwise
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const auth = this.betterAuthService.client;
    const request = context.switchToHttp().getRequest<
      Request & {
        session: UserSession | null;
        user: UserSession['user'] | null;
      }
    >();
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(request.headers),
    });

    request.session = session;
    request.user = session?.user ?? null; // useful for observability tools like Sentry

    const isPublic = this.reflector.getAllAndOverride<boolean>('PUBLIC', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const isOptional = this.reflector.getAllAndOverride<boolean>('OPTIONAL', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isOptional && !session) return true;

    if (!session)
      throw new APIError(401, {
        code: 'UNAUTHORIZED',
        message: 'Unauthorized',
      });

    return true;
  }
}
