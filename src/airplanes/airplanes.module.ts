import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirplaneType } from '../database/aircraftType.entity';
import { AirplanesController } from './airplanes.controller';
import { AirplanesService } from './airplanes.service';
import { Airplane } from '../database/airplane.entity';
@Module({
    imports: [TypeOrmModule.forFeature([AirplaneType, Airplane])],
    controllers: [AirplanesController],
    providers: [AirplanesService],
    exports: [AirplanesService],
})
export class AirplanesModule {}
