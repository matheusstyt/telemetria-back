import { Module } from "@nestjs/common"
import { MqttService } from "./mqtt.services";
import { ValueDeviceServices } from "src/valuesDevices/valuesDevices.services";
import { ValuesDevicesEntity } from "src/valuesDevices/valuesDevices.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DeviceServices } from "src/devices/devices.services";
import { DevicesEntity } from "src/devices/devices.entity";
import { CompaniesServices } from "src/companies/companies.services";
import { CompaniesEntity } from "src/companies/companies.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ValuesDevicesEntity, DevicesEntity, CompaniesEntity])],
    providers: [
        ValueDeviceServices, 
        DeviceServices, 
        CompaniesServices, 
        MqttService]
})
export class MqttModule {};