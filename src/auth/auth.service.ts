import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { RegisterDTO } from './registerDTO';
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async singIn(email: string, pass: string): Promise<{ accessToken: string }> {
        const user = await this.usersService.findOneByEmail(email);
        if(user==null){
            throw new UnauthorizedException();
        }
        const passwordValid = await compare(pass, user?.password);
        if (user==null || !passwordValid) {
            throw new UnauthorizedException();
        }

        const payload = { email: user.email, sub: user.id };
        return {
            accessToken: await this.jwtService.signAsync(payload),
        };
    }
    async register(registerDTO: RegisterDTO){
        return this.usersService.registerUser(registerDTO);
    }
}
