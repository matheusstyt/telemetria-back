import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm";
import { ValuesDevicesEntity } from "./valuesDevices.entity";
import { ValueDeviceServices } from "./valuesDevices.services";
import { ValuesDeviceController } from "./valuesDevices.controller";
import { DeviceServices } from "src/devices/devices.services";
import { DevicesEntity } from "src/devices/devices.entity";
@Module({
    imports: [TypeOrmModule.forFeature([ValuesDevicesEntity, DevicesEntity])],
    controllers: [ValuesDeviceController],
    providers: [ValueDeviceServices, DeviceServices]
})
export class ValuesDeviceModule {};