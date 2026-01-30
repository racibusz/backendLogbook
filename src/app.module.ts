import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthGuard } from './auth/auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './database/user.entity';
import { FlightsModule } from './flights/flights.module';
import { Flight } from './database/flight.entity';
import { AirplaneType } from './database/aircraftType.entity';
import { AirplanesModule } from './airplanes/airplanes.module';
import { Airplane } from './database/airplane.entity';
import { Endorsement } from './database/endorsement.entity';
import { License } from './database/license.entity';
import { LicenseModule } from './licenses/licenses.module';
import { AirportEntity } from './database/airport.entity';
import {AirportsModule} from './airports/airports.module';

@Module({
  imports: [AuthModule, UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '', // TODO: Replace it with data took from environment variables
      database: 'logbook_app',
      entities: [User, Flight, AirplaneType, Airplane, Endorsement, License, AirportEntity],
      synchronize: true, // Set to false in production
    }),
    FlightsModule, AirplanesModule, LicenseModule, AirportsModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard
    }
  ],
}) 
export class AppModule {}
