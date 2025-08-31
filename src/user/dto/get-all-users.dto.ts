import { createZodDto } from 'nestjs-zod';
import { UserSchema } from 'src/user/dto/user.dto';
import z from 'zod';

export class GetAllUsersDto extends createZodDto(
  z.object({
    data: UserSchema.array(),
  }),
) {}
