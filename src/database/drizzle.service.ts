import { drizzle } from 'drizzle-orm/node-postgres';
import { Injectable } from '@nestjs/common';
import { schema } from './database.schema';
import { DatabaseConfig } from 'src/config/database.config';

const getDrizzle = (databaseConfig: DatabaseConfig) =>
  drizzle(databaseConfig.databaseUrl, {
    schema,
  });

@Injectable()
export class DrizzleService {
  client: ReturnType<typeof getDrizzle>;
  schema = schema;

  constructor(private readonly databaseConfig: DatabaseConfig) {
    this.client = getDrizzle(this.databaseConfig);
  }
}
