import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/user.entity';
import { License } from '../database/license.entity';
import { LicensesController } from './licenses.controller';
import { LicensesService } from './licenses.service';
import { FlightsModule } from '../flights/flights.module';

@Module({
  providers: [LicensesService],
  controllers: [LicensesController],
  exports: [], 
  imports: [TypeOrmModule.forFeature([License]), FlightsModule]})
export class LicenseModule {}
