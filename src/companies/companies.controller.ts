import { 
    Controller, 
    Post, 
    Get, 
    Put, 
    Delete, 
    Param, 
    Body, 
    NotFoundException 
} from "@nestjs/common";

import { CompaniesEntity } from "./companies.entity";
import { CompaniesDTO, } from "./dto/Companies.dto";
import { v4 as uuid } from "uuid";
import { CompaniesServices } from "./companies.services";
import { MqttService } from "client/mqtt.services";

@Controller("/companies")
export class CompaniesController {

    constructor ( 
        private CompaniesServices: CompaniesServices,
        private mqttServices: MqttService
        ) {}

    @Post()
    async createCompanies(@Body() data: CompaniesDTO) {

        const companiesEntity = new CompaniesEntity();
        companiesEntity.id = uuid();
        companiesEntity.descricao = data.descricao;
        companiesEntity.url = data.url;
        try {
            await this.CompaniesServices.save(companiesEntity);
            this.mqttServices.checkUpdatedCompanies();
        } catch (error) {
            
        }

        console.log(companiesEntity);

        return { status: "Criado com sucesso!", data: companiesEntity};
    }
    @Get(":id") // Captura o parâmetro 'id' da rota
    async getCompanies(@Param("id") id: string) {
        const company = await this.CompaniesServices.findOne(id);

        if(!company) throw new NotFoundException("Company não encontrado")
        
        return { status: "Retornado com sucesso!", data: company};
    }

    @Get()
    async list() {
        const companiesBanco = await this.CompaniesServices.list();
        return  {list : companiesBanco};
    }

    @Put('/:id') // Captura o parâmetro 'id' da rota
    async updateCompanies(@Param('id') id: string, @Body() newData: CompaniesEntity) {
        const novoCompany = await this.CompaniesServices.update(id, newData);
        return { status: "Alterado com sucesso!", data: novoCompany };
    }

    @Delete('/:id') // Captura o parâmetro 'id' da rota
    async deleteCompanies(@Param('id') id: string) {
        const deleteCompany = await this.CompaniesServices.delete(id);
        return { status: "Deletado com sucesso!", data: deleteCompany };
    }

}