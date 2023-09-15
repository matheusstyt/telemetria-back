import { Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DevicesEntity } from "./devices.entity";
import { DevicesDTO } from "./dto/devices.dto";

@Injectable()
export class DeviceServices {
    constructor (
        @InjectRepository(DevicesEntity)
        private readonly devicesRepository: Repository<DevicesEntity>
    ) {}

    async save(molde : DevicesEntity) {
        await this.devicesRepository.save(molde);
    }

    async findOne(id : string): Promise<DevicesEntity | undefined> {
        return this.devicesRepository.findOne({where: { id }, relations: ['values']});
    }
    async findTopico(topico : string): Promise<DevicesEntity | undefined> {
        return this.devicesRepository.findOne({where: { topico }, relations: ['values']});
    }

    async list() {
        const devices = await this.devicesRepository.find({relations: ["values"]});
        return devices;
    }

    async update(id: string, newData: DevicesDTO){
        await this.devicesRepository.update(id, newData);
    }

    async delete(id: string) {
        await this.devicesRepository.delete(id);
    }
}