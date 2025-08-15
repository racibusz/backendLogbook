import { FlightsService } from './flights.service';
import { Body, Controller, Query } from '@nestjs/common';
import { Get, Post } from '@nestjs/common';
import { Request } from '@nestjs/common';
import { FlightsPage } from './flights.page';
import { Param } from '@nestjs/common';
import { CreateFlightDTO } from './createFlightDTO';
import { SummaryDTO } from './summaryDTO';
import { SummaryResponseDTO } from './SummaryResponse';

@Controller('flights')
export class FlightsController {
    constructor(private flightsService: FlightsService) {}
    @Get("summary")
    async getSummary(@Request() req, @Query('page') page?: number):Promise<SummaryResponseDTO>{
        const user = await req.user;
        return this.flightsService.getSummary(user.sub, page);
    }

    @Get('')
    async getFlightsPaged(@Request() req, @Query('page') page?: number) : Promise<FlightsPage>{
        const user = await req.user;
        const result = this.flightsService.getFlights(user.sub, page);
        return(result);
    }

    @Post()
    async addFlight(@Request() req,@Body() flightDTO: CreateFlightDTO){
        const user = await req.user;
        return this.flightsService.addFlight(user.sub, flightDTO);
    }

    
}
