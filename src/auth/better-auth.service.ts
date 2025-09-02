import { Injectable } from '@nestjs/common';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { betterAuth, BetterAuthOptions } from 'better-auth';
import { DrizzleService } from 'src/database/drizzle.service';
import {
  admin as adminPlugin,
  bearer,
  openAPI,
  organization,
} from 'better-auth/plugins';
import { ac, member, admin, owner } from 'src/auth/permissions';
import { BETTER_AUTH_BASE_PATH, TRUSTED_ORIGINS } from 'src/auth/constants';

const getBetterAuth = (drizzleService: DrizzleService) => {
  const authConfig = {
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
    plugins: [
      bearer(),
      openAPI(),
      adminPlugin(),
      organization({
        ac,
        roles: {
          member,
          admin,
          owner,
        },
      }),
    ],
  } satisfies BetterAuthOptions;

  return betterAuth(authConfig) as ReturnType<
    typeof betterAuth<typeof authConfig>
  >;
};

@Injectable()
export class BetterAuthService {
  readonly client: ReturnType<typeof getBetterAuth>;

  constructor(private drizzleService: DrizzleService) {
    this.client = getBetterAuth(this.drizzleService);
  }
}
