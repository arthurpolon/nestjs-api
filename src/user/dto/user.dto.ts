import { createSelectSchema } from 'drizzle-zod';
import { createZodDto } from 'nestjs-zod';
import { schema } from 'src/database/database.schema';
import z from 'zod';

export const UserSchema = createSelectSchema(schema.user, {
  createdAt: z.preprocess(
    (val) => (val instanceof Date ? val.toISOString() : val),
    z.iso.datetime(),
  ),
  updatedAt: z.preprocess(
    (val) => (val instanceof Date ? val.toISOString() : val),
    z.iso.datetime(),
  ),
});

export class User extends createZodDto(UserSchema) {}
