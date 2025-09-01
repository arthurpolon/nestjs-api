import { drizzle } from 'drizzle-orm/node-postgres';
import { Injectable } from '@nestjs/common';
import { DatabaseConfig } from 'src/config/database.config';
import * as schema from 'src/database/database.schema';

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
