import { BadRequestException, Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/user/Dto/login.dto';
import { RegisterDto } from 'src/user/Dto/register.dtot';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {

    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
      ) {}
    
      @Post('register')
      async register(@Body() body: RegisterDto) {
    
        const hashed = await bcrypt.hash(body.password, 8);
        const newUser: any = await this.usersService.createUser({
          name: body.name,
          email: body.email,
          password: hashed,
        });
        if (newUser == null) {
          return new BadRequestException('email already used !');
        }
        return newUser;
      }
    
      @Post('login')
      async login(@Body() body: LoginDto) {

        const user: User = await this.usersService.getUserCredentials(body.email);
        if (!user) {
          throw new NotFoundException('User not found !');
        }
    
        if (!(await bcrypt.compare(body.password, user.password))) {
          throw new BadRequestException('Password invalid !');
        }
    
        const jwt = this.jwtService.signAsync({ email: user.email });
        return {
          user: user,
          access_token: (await jwt).toString(),
        };
      }

}
