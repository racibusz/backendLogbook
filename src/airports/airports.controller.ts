import { Body, Controller, Query } from '@nestjs/common';
import { Get, Post } from '@nestjs/common';
import { Request } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { AirportsService } from './airports.service';
import { AirportEntity } from '../database/airport.entity';

@Controller('airports')
export class AirportsController {
    constructor(private airportsService: AirportsService) {}
    @Get()
    async getAirports(){
        return await this.airportsService.getAirports();
    }
    @Get(':icao')
    async getAirportByIcao(@Param('icao') icao:string){
        return await this.airportsService.getAirportByIcao(icao, 0);
    }
    @Post()
    async saveAirport(@Body() airportToSave: AirportEntity){
        console.log("SAVING AIRPORT INVOKED");
        return await this.airportsService.saveAirport(airportToSave);
    }
}
