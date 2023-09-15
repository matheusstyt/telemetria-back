import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm";

import { DeviceServices } from "./devices.services";
import { DevicesEntity } from "./devices.entity";
import { DeviceController } from "./devices.controller";
import { ValuesDevicesEntity } from "src/valuesDevices/valuesDevices.entity";
import { ValueDeviceServices } from "src/valuesDevices/valuesDevices.services";
import { CompaniesServices } from "src/companies/companies.services";
import { CompaniesEntity } from "src/companies/companies.entity";
@Module({
    imports: [TypeOrmModule.forFeature([DevicesEntity, ValuesDevicesEntity, CompaniesEntity])],
    controllers: [DeviceController],
    providers: [DeviceServices,  ValueDeviceServices, CompaniesServices]
})
export class DevicesModule {};