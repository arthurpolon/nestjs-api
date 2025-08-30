import { Configuration, Value } from '@itgorillaz/configify';
import { IsString } from 'class-validator';

@Configuration()
export class DatabaseConfig {
  @IsString()
  @Value('DATABASE_URL')
  databaseUrl: string;
}
