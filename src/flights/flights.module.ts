import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flight } from '../database/flight.entity';
import { FlightsController } from './flights.controller';
import { FlightsService } from './flights.service';
import { AirplanesModule } from '../airplanes/airplanes.module';
@Module({
    imports: [TypeOrmModule.forFeature([Flight]), AirplanesModule],
    controllers: [FlightsController],
    providers: [FlightsService],
    exports: [FlightsService]
})
export class FlightsModule {}
