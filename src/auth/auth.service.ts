import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async singIn(email: string, pass: string): Promise<{ accessToken: string }> {
        const user = await this.usersService.findOneByEmail(email);
        
        // TODO: Zaimplementuj bezpieczne sprawdzanie hasła (np. bcrypt)
        if (user?.password !== pass) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { email: user.email, sub: user.id };
        return {
            accessToken: await this.jwtService.signAsync(payload),
        };
    }
}
