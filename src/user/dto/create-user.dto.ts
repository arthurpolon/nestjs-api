import { createZodDto } from 'nestjs-zod';
import { UserSchema } from 'src/user/dto/user.dto';

const CreateUserSchema = UserSchema.omit({
  createdAt: true,
  updatedAt: true,
  emailVerified: true,
});

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
