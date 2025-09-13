import { Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from '@nestjs/common';
import { userDTO } from './userDTO';
import { plainToInstance } from 'class-transformer';
import { Body } from '@nestjs/common';

@Controller('user')
export class UsersController {
    constructor(private usersService: UsersService){}
    @Get()
    async getUser(@Request() req): Promise<userDTO>{
        const user = await req.user;
        const resultUser = await this.usersService.findOneById(user.sub);
        if(resultUser==null)
            throw NotFoundException
        return plainToInstance(userDTO, resultUser, {
            excludeExtraneousValues: true,
        });

    }
    @Post()
    async updateUser(@Request() req, @Body() newUser: userDTO): Promise<userDTO>{
        const user = await req.user;
        const result = await this.usersService.modifyUser(user.sub, newUser)
        if(result == null)
            throw new NotFoundException("User not found")
        return plainToInstance(userDTO, result, {
            excludeExtraneousValues: true,
        });
    }
}