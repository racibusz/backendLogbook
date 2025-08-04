import { Controller, Query } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Request } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { AirplanesService } from './airplanes.service';

@Controller('airplanes')
export class AirplanesController {
    constructor(private airplanesService: AirplanesService) {}

    @Get('/types/:type')
    getFlights(@Param('type') type: string){
        const result = this.airplanesService.getTypes(type);
        return(result);
    }
    
}
