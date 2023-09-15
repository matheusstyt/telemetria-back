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
import { ListCompaniesService } from 'client/list.companies.services';

@Module({
  imports: [
    MqttModule,
    DevicesModule,
    CompaniesModule,
    ValuesDeviceModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService]
    })
  ],
  providers: [AppService,],
})
export class AppModule {}
