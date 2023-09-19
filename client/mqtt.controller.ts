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

import { MQTTServices } from "client/mqtt.services";
import { ICompany } from "./dto";
import { CompaniesServices } from "src/companies/companies.services";
import { DevicesEntity } from "src/devices/devices.entity";

@Controller("/mqttLicence")
export class MQTTController {

    constructor ( 
        private mqttServices: MQTTServices,
        private companiesServices: CompaniesServices
        ) {}

    @Post()
    async createLicenca(@Body() data: ICompany) {
        const companyExistente = await this.companiesServices.findOne(data.id);

        if(!companyExistente) throw new NotFoundException("Company não encontrado");

        try {
            await this.mqttServices
            .connectToNewBroker (
                companyExistente.id,
                companyExistente.url,
                companyExistente.devices.map((device: DevicesEntity) => device.topico)
            );
        } catch (error) {
            
        }
        return { status: "Registrado com sucesso!", data: companyExistente};
    }
    @Get(":id") // Captura o parâmetro 'id' da rota
    async getLicencas(@Param("id") id: string) {

        const mqttClients = this.mqttServices.getMqttClients();
        // Percorra o objeto mqttClients
        for (const companyId in mqttClients) {
        // Verifique se a propriedade pertence ao objeto em vez do protótipo
            if (mqttClients.hasOwnProperty(companyId)) { 
                if( id === companyId) {
                    const companyExistente = await this.companiesServices.findOne(companyId);
                    return {status: "Retornado com sucesso!", data: companyExistente};
                }else{throw new NotFoundException("Company não encontrado na lista de serviços.");}
            }else{throw new NotFoundException("Company não encontrado na lista de serviços.");}
        }
    }

    @Get()
    async list() {
        const mqttClients = this.mqttServices.getMqttClients();

        const companiesAtivasId: string[] = [];

        // Percorra o objeto mqttClients
        for (const companyId in mqttClients) {
        // Verifique se a propriedade pertence ao objeto em vez do protótipo
            if (mqttClients.hasOwnProperty(companyId)) {  
               // companiesAtivasId.push(await this.companiesServices.findOne(companyId));
                companiesAtivasId.push(companyId);
            }
        }

        const companiesAtivasEntity: ICompany[] = await this.companiesServices.list();

        const companiesWithStatus: ICompany[] = [];

        for (const companyItem of companiesAtivasEntity) {
            const isActive = companiesAtivasId.includes(companyItem.id);
            companyItem.status = isActive;
            companiesWithStatus.push(companyItem);
        }

        console.log(companiesWithStatus);

        return  {list : companiesWithStatus};
    }

    // @Put('/:id') // Captura o parâmetro 'id' da rota
    // async updateCompanies(@Param('id') id: string, @Body() newData: CompaniesEntity) {
    //     const novoCompany = await this.mqttServices.update(id, newData);
    //     return { status: "Alterado com sucesso!", data: novoCompany };
    // }

    @Delete('/:id') // Captura o parâmetro 'id' da rota
    async deleteLicenca(@Param('id') id: string) {
        const removed = this.mqttServices.removeClient(id);

        if(!removed) throw new NotFoundException("Company não encontrado na lista de serviços.")
        else return {status: "Removido com sucesso!"}
    }

}