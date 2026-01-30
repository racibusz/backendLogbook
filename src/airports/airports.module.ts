import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flight } from '../database/flight.entity';
import { AirplanesModule } from '../airplanes/airplanes.module';
import { AirportEntity } from '../database/airport.entity';
import { AirportsController } from './airports.controller';
import { AirportsService } from './airports.service';
@Module({
    imports: [TypeOrmModule.forFeature([AirportEntity])],
    controllers: [AirportsController],
    providers: [AirportsService],
    exports: [AirportsService]
})
export class AirportsModule {}
