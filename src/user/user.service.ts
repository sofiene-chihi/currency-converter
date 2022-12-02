import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './Dto/register.dtot';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUserCredentials(email: string) {
    const user = await this.userRepository.findOne({ email });
    if (user != undefined) {
      return user;
    } else {
      return null;
    }
  }

  async createUser(data: RegisterDto): Promise<User> {
    if ((await this.getUserCredentials(data.email)) != null) {
      return null;
    }
    const newUser: User = this.userRepository.create(data);

    await this.userRepository.save(newUser);
    return newUser;
  }
}
