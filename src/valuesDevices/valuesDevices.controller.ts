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

import { ValueDeviceServices } from "./valuesDevices.services";
import { ValuesDevicesEntity } from "./valuesDevices.entity";
import { ValueDevicesDTO } from "./dto/valuesDevices.dto";
import { v4 as uuid } from "uuid";
import { DeviceServices } from "src/devices/devices.services";

@Controller("/valuesDevices")
export class ValuesDeviceController {

    constructor ( 
        private valuesDevicesServices: ValueDeviceServices,
        private devicesServices: DeviceServices
         ) {}

    @Post()
    async createValue(@Body() data: ValueDevicesDTO) {

        const novoValorEntity = new ValuesDevicesEntity();
        novoValorEntity.id = uuid();
        novoValorEntity.peso = data.peso
 
        await this.valuesDevicesServices.save(novoValorEntity);

        if(data.fk_device){

            const device = await this.devicesServices.findOne(data.fk_device);

            device.values.push(novoValorEntity);

            await this.devicesServices.save(device);

        }else{
            throw new ForbiddenException("ID de identificação inválido!");
        }
        console.log(novoValorEntity);

        return { status: "Criado com sucesso!", data};
    }
    @Get(":id") // Captura o parâmetro 'id' da rota
    async getValue(@Param("id") id: string) {
        const valor = await this.valuesDevicesServices.findOne(id);

        if(!valor) throw new NotFoundException("Valor não encontrado")
        
        return { status: "Retornado com sucesso!", data: valor};
    }

    @Get()
    async listValues() {
        const valoreBanco = await this.valuesDevicesServices.list();
        return  {list: valoreBanco};
    }

    @Put('/:id') // Captura o parâmetro 'id' da rota
    async updateValue(@Param('id') id: string, @Body() newData: ValueDevicesDTO) {
        const novoValor = await this.valuesDevicesServices.update(id, newData);
        return { status: "Alterado com sucesso!", data: novoValor };
    }

    @Delete('/:id') // Captura o parâmetro 'id' da rota
    async deleteValue(@Param('id') id: string) {
        const deleteValor = await this.valuesDevicesServices.delete(id);
        return { status: "Deletado com sucesso!", data: deleteValor };
    }

}