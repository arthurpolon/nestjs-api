import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabasesModule } from 'src/database/database.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [DatabasesModule],
})
export class UserModule {}
