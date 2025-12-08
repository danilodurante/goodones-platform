import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Label } from '../entities/label.entity';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Label])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
