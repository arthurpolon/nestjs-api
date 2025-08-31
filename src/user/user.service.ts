import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DrizzleService } from 'src/database/drizzle.service';
import { schema } from 'src/database/database.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UserService {
  constructor(private drizzleService: DrizzleService) {}

  async create(createUserDto: CreateUserDto) {
    const [newUser] = await this.drizzleService.client
      .insert(schema.user)
      .values(createUserDto)
      .returning();

    return newUser;
  }

  async findAll() {
    const users = await this.drizzleService.client.query.user.findMany();

    return users;
  }

  async findOne(id: string) {
    const selected = await this.drizzleService.client.query.user.findFirst({
      where: eq(schema.user.id, id),
    });

    return selected;
  }
}
