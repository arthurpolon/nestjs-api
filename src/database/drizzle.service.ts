import { drizzle } from 'drizzle-orm/node-postgres';
import { Injectable } from '@nestjs/common';
import * as schema from './schema';
import { ConfigService } from '@nestjs/config';
import { EnvSchema } from 'src/config/validator';

const getDrizzle = (configService: ConfigService<EnvSchema>) =>
  drizzle(configService.getOrThrow('DATABASE_URL', { infer: true }), {
    schema,
  });

@Injectable()
export class DrizzleService {
  client: ReturnType<typeof getDrizzle>;
  schema = schema;

  constructor(private readonly configService: ConfigService<EnvSchema>) {
    this.client = getDrizzle(this.configService);
  }
}
