import { Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { Request } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Body } from '@nestjs/common';
import { LicensesService } from './licenses.service';

@Controller('license')
export class LicensesController {
    constructor(private lisensesService: LicensesService){}
    @Get()
    async getLicenses(@Request() req){
        const user = await req.user;
        const userId = user.sub;
        return await this.lisensesService.getLicenses(userId)
    }
}