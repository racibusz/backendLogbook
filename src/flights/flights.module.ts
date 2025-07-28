import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flight } from '../database/flight.entity';
import { FlightsController } from './flights.controller';
import { FlightsService } from './flights.service';
@Module({
    imports: [TypeOrmModule.forFeature([Flight])],
    controllers: [FlightsController],
    providers: [FlightsService]
})
export class FlightsModule {}
