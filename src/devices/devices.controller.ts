import { 
    Controller, 
    Post, 
    Get, 
    Put, 
    Delete, 
    Param, 
    Body, 
    NotFoundException,
    ForbiddenException 
} from "@nestjs/common";

import { DeviceServices } from "./devices.services";
import { DevicesEntity } from "./devices.entity";
import { DevicesDTO, } from "./dto/devices.dto";
import { v4 as uuid } from "uuid";
import { CompaniesServices } from "src/companies/companies.services";

@Controller("/devices")
export class DeviceController {

    constructor ( 
        private devicesServices: DeviceServices,
        private companiesServices: CompaniesServices
        ) {}

    @Post()
    async createDevices(@Body() data: DevicesDTO) {

        const devicesEntity = new DevicesEntity();
        devicesEntity.id = uuid();
        devicesEntity.descricao = data.descricao;
        devicesEntity.topico = data.topico;
     
        await this.devicesServices.save(devicesEntity);

        if(data.fk_company){

            const company = await this.companiesServices.findOne(data.fk_company);

            company.devices.push(devicesEntity)

            await this.companiesServices.save(company);

        }else{
            throw new ForbiddenException("ID de identificação inválido!");
        }

        console.log(devicesEntity);

        return { status: "Criado com sucesso!", data: devicesEntity};
    }
    @Get(":id") // Captura o parâmetro 'id' da rota
    async getDevices(@Param("id") id: string) {
        const valor = await this.devicesServices.findOne(id);

        if(!valor) throw new NotFoundException("Valor não encontrado")
        
        return { status: "Retornado com sucesso!", data: valor};
    }

    @Get()
    async list() {
        const valoreBanco = await this.devicesServices.list();
        return  {list: valoreBanco};
    }

    @Put('/:id') // Captura o parâmetro 'id' da rota
    async updateDevices(@Param('id') id: string, @Body() newData: DevicesDTO) {
        const novoValor = await this.devicesServices.update(id, newData);
        return { status: "Alterado com sucesso!", data: novoValor };
    }

    @Delete('/:id') // Captura o parâmetro 'id' da rota
    async deleteDevices(@Param('id') id: string) {
        const deleteValor = await this.devicesServices.delete(id);
        return { status: "Deletado com sucesso!", data: deleteValor };
    }

}