import { Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CompaniesEntity } from "./companies.entity";
import { CompaniesDTO } from "./dto/Companies.dto";
import { DevicesEntity } from "src/devices/devices.entity";

@Injectable()
export class CompaniesServices {
    constructor (
        @InjectRepository(CompaniesEntity)
        private readonly companiesRepository: Repository<CompaniesEntity>
    ) {}

    async save(company : CompaniesEntity) {
        await this.companiesRepository.save(company);
    }

    async findOne(id : string): Promise<CompaniesEntity | undefined> {
        return this.companiesRepository.findOne({where: { id }, relations: ['devices']});
    }

    async list() {
        const companiesBanco = await this.companiesRepository.find({relations: ["devices"]});
        let list = companiesBanco.map((company: CompaniesEntity) => {
            return {
                id:company.id, 
                broker: company.url,
                descricao: company.descricao,
                devices: company.devices
            }})
        return list;
    }

    async update(id: string, newData: CompaniesEntity){
        await this.companiesRepository.update(id, newData);
    }

    async delete(id: string) {
        await this.companiesRepository.delete(id);
    }
}