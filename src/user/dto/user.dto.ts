import { createSelectSchema } from 'drizzle-zod';
import { createZodDto } from 'nestjs-zod';
import { user } from 'src/database/database.schema';
import z from 'zod';

export const UserSchema = createSelectSchema(user, {
  createdAt: z.preprocess(
    (val) => (val instanceof Date ? val.toISOString() : val),
    z.iso.datetime(),
  ),
  updatedAt: z.preprocess(
    (val) => (val instanceof Date ? val.toISOString() : val),
    z.iso.datetime(),
  ),
  banExpires: z.preprocess(
    (val) => (val instanceof Date ? val.toISOString() : val),
    z.iso.datetime(),
  ),
});

export class User extends createZodDto(UserSchema) {}
