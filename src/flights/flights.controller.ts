import { FlightsService } from './flights.service';
import { Controller, Query } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Request } from '@nestjs/common';
import { FlightsPage } from './flights.page';
import { Param } from '@nestjs/common';

@Controller('flights')
export class FlightsController {
    constructor(private flightsService: FlightsService) {}

    @Get()
    getFlights(@Request() req) : Promise<FlightsPage>{
        // req.user.sub < - User id
        const result = this.flightsService.getFlights(req.user.sub);
        return(result);
    }
    @Get(":page")
    getFlightsPaged(@Request() req, @Param("page") page:number) : Promise<FlightsPage>{
        // req.user.sub < - User id
        const result = this.flightsService.getFlights(req.user.sub, page);
        return(result);
    }
    
}
