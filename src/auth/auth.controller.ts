import { Controller, Post, HttpCode, HttpStatus, Body, UseGuards } from '@nestjs/common';import { AuthService } from './auth.service';
import { SignInDTO } from './singInDTO';
import { Public } from './public.decorator';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @Public()
    logIn(@Body() signInDTO: SignInDTO) {
        return this.authService.singIn(signInDTO.email, signInDTO.password);
    }
}
