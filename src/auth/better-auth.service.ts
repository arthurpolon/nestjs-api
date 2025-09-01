import { Injectable } from '@nestjs/common';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { betterAuth } from 'better-auth';
import { DrizzleService } from 'src/database/drizzle.service';
import { admin, bearer, openAPI } from 'better-auth/plugins';
import { BETTER_AUTH_BASE_PATH, TRUSTED_ORIGINS } from 'src/auth/constants';

const getBetterAuth = (drizzleService: DrizzleService) =>
  betterAuth({
    database: drizzleAdapter(drizzleService.client, {
      provider: 'pg',
    }),

    basePath: BETTER_AUTH_BASE_PATH,

    emailAndPassword: {
      enabled: true,
    },
    telemetry: {
      enabled: false,
    },
    trustedOrigins: TRUSTED_ORIGINS,
    plugins: [bearer(), openAPI(), admin()],
  });

@Injectable()
export class BetterAuthService {
  readonly client: ReturnType<typeof getBetterAuth>;

  constructor(private drizzleService: DrizzleService) {
    this.client = getBetterAuth(this.drizzleService);
  }
}
