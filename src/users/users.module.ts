import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './controllers/user.controller';
import { Users } from './entities/user.entity';
import { UserService } from './services/user.service';


@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule]
})
export class UsersModule {}
