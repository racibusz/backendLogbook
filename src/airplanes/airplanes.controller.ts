import { Controller, Query } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Request } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { AirplanesService } from './airplanes.service';

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

}
