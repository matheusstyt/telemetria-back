import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm";

import { CompaniesServices } from "./companies.services";
import { CompaniesEntity } from "./companies.entity";
import { CompaniesController } from "./companies.controller";
import { DevicesEntity } from "src/devices/devices.entity";
import { DeviceServices } from "src/devices/devices.services";
import { MQTTServices } from "client/mqtt.services";
import { ValueDeviceServices } from "src/valuesDevices/valuesDevices.services";
import { ValuesDevicesEntity } from "src/valuesDevices/valuesDevices.entity";
@Module({
    imports: [TypeOrmModule.forFeature([CompaniesEntity, DevicesEntity, ValuesDevicesEntity])],
    controllers: [CompaniesController],
    providers: [
        CompaniesServices, 
        DeviceServices, 
        MQTTServices,
        ValueDeviceServices
    ]
})
export class CompaniesModule {};