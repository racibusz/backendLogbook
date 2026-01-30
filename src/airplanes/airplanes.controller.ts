import { Controller, Post, Query } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Request, Body } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { AirplanesService } from './airplanes.service';
import { AirplaneDTO } from './airplaneDTO';

@Controller('airplanes')
export class AirplanesController {
    constructor(private airplanesService: AirplanesService) {}
    @Get()
    async getAirplanes(@Request() req){
        const user = await req.user;
        const result = this.airplanesService.getAirplanesByAssignedUser(user.sub);
        return result;
    }
    @Get('/types/:type')
    getTypes(@Param('type') type: string){
        const result = this.airplanesService.getTypes(type);
        return(result);
    }
    @Get('/:registration')
    getAirplaneByRegistration(@Param('registration') registration: string){
        const result = this.airplanesService.getAirplanesByRegistration(registration);
        return result;
    }

    @Post('/modify')
    async modifyAirplane(@Request() req, @Body() newAirplane : AirplaneDTO){
        const user = await req.user;
        const result = this.airplanesService.modifyAirplane(user.sub, newAirplane)
    }
}
