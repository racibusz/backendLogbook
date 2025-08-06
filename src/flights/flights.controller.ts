import { FlightsService } from './flights.service';
import { Body, Controller, Query } from '@nestjs/common';
import { Get, Post } from '@nestjs/common';
import { Request } from '@nestjs/common';
import { FlightsPage } from './flights.page';
import { Param } from '@nestjs/common';
import { CreateFlightDTO } from './createFlightDTO';

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

    @Post()
    addFlight(@Request() req,@Body() flightDTO: CreateFlightDTO){
        return this.flightsService.addFlight(req.user.sub, flightDTO);
    }
    
}
