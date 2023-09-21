import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from 'config/postgres.config.services';
import { ConfigModule } from '@nestjs/config';
import { CompaniesModule } from './companies/companies.module';
import { DevicesModule } from './devices/devices.module';
import { ValuesDeviceModule } from './valuesDevices/valuesDevices.module';
import { MqttModule } from 'client/mqtt.module';
import { UserModule } from './users/users.module';
import { AuthModule } from './authentication/authentication.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './authentication/authentication.guard';

@Module({
  imports: [
    AuthModule,
    MqttModule,
    UserModule,
    DevicesModule,
    CompaniesModule,
    ValuesDeviceModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService]
    })
  ],
  providers: [AppService, {provide: APP_GUARD, useClass: AuthGuard}],
})
export class AppModule {}
