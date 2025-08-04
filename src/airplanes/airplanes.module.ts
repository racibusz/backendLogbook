import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirplaneType } from '../database/aircraftType.entity';
import { AirplanesController } from './airplanes.controller';
import { AirplanesService } from './airplanes.service';
@Module({
    imports: [TypeOrmModule.forFeature([AirplaneType])],
    controllers: [AirplanesController],
    providers: [AirplanesService]
})
export class AirplanesModule {}
