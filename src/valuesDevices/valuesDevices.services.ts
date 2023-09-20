import { Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ValuesDevicesEntity } from "./valuesDevices.entity";
import { ValueDevicesDTO } from "./dto/valuesDevices.dto";

@Injectable()
export class ValueDeviceServices {
    constructor (
        @InjectRepository(ValuesDevicesEntity)
        private readonly valuesDevicesRepository: Repository<ValuesDevicesEntity>
    ) {}

    async save(value : ValuesDevicesEntity) {
        await this.valuesDevicesRepository.save(value);
    }

    async findOne(id : string): Promise<ValuesDevicesEntity | undefined> {
        return this.valuesDevicesRepository.findOne({where: { id }, relations: ['produto']});
    }

    async list() {
        const values = await this.valuesDevicesRepository.find();
        return values;
    }

    async update(id: string, newData: ValueDevicesDTO){
        await this.valuesDevicesRepository.update(id, newData);
    }

    async delete(id: string) {
        await this.valuesDevicesRepository.delete(id);
    }
}