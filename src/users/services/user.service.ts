import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from '../dtos/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async findOne(
    payload: UpdateUserDto,
  ): Promise<UpdateUserDto | { message: string; }> {
    try {
      const { username, password } = payload;
      const saltRounds = 12;

      if (username == undefined || username == '')
        throw new Error('Username Incorrect!');

      const hash = await bcrypt.hash(password, saltRounds);
      const isEqual = await bcrypt.compare(password, hash);

      if (!isEqual) throw new Error('Password Incorrect!');

      const user = await this.usersRepository.findOneBy({
        username: username,
      });
      return { fullname: user.fullname };
    } catch (error) {
      console.error(`The following error ocurred: ${error}`);
      return { message: error };
    }
  }
}
