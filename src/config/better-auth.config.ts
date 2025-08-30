import { Configuration, Value } from '@itgorillaz/configify';
import { IsString } from 'class-validator';

@Configuration()
export class BetterAuthConfig {
  @IsString()
  @Value('DATABASE_URL')
  databaseUrl: string;

  @IsString()
  @Value('BETTER_AUTH_SECRET')
  secret: string;
}
