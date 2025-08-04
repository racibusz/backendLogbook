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

@Module({
  imports: [AuthModule, UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '', // TODO: Replace it with data took from environment variables
      database: 'logbook_app',
      entities: [User, Flight, AirplaneType],
      synchronize: true, // Set to false in production
    }),
    FlightsModule, AirplanesModule
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
