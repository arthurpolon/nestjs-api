import { Injectable } from '@nestjs/common';
import { DrizzleService } from 'src/database/drizzle.service';
import { user } from 'src/database/database.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UserService {
  constructor(private drizzleService: DrizzleService) {}

  async findAll() {
    const users = await this.drizzleService.client.query.user.findMany();

    return users;
  }

  async findOne(id: string) {
    const selected = await this.drizzleService.client.query.user.findFirst({
      where: eq(user.id, id),
    });

    return selected;
  }
}
