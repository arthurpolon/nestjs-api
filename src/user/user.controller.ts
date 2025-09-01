import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ZodResponse } from 'nestjs-zod';
import { GetAllUsersDto } from 'src/user/dto/get-all-users.dto';
import { Public } from 'src/auth/auth.decorator';

@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @ZodResponse({ type: GetAllUsersDto })
  @Get()
  async findAll() {
    const users = await this.userService.findAll();

    return {
      data: users,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }
}
