import { Injectable } from '@nestjs/common/decorators';
import { UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from '../dtos/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async findOne(
    payload: UpdateUserDto,
  ): Promise<Pick<Users, 'fullname'>> {
    const { username, password } = payload;
    if (typeof username !== 'string' || !username ||
        typeof password !== 'string' || !password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const user = await this.usersRepository.findOneBy({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return { fullname: user.fullname };
  }
}
