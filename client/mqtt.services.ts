import { ValueDeviceServices } from "src/valuesDevices/valuesDevices.services";
import { ValuesDevicesEntity } from "src/valuesDevices/valuesDevices.entity";
import { CompaniesServices } from "src/companies/companies.services";
import { DeviceServices } from "src/devices/devices.services";
import { Injectable } from "@nestjs/common";
import { v4 as uuid } from "uuid";
import { ICompany } from "./dto";
const mqtt = require('mqtt'); 

@Injectable()
export class MQTTServices {

    private mqttClients: { [companyId: string]: ICompany } = {};  // Armazena os clientes MQTT por empresa

    constructor( 

        private valueDeviceServices: ValueDeviceServices,
        private devicesServices: DeviceServices,
        private companiesServices: CompaniesServices

    ) { 
    
    }

     async checkUpdatedCompanies() {
        await this.companiesServices.list()
        .then(async (companies: ICompany[]) => {
            for (const company of companies) {
                if (!this.mqttClients[company.id]) {
                    await this.connectAndListen(company.id, company.broker, company.topicos);
                }
            };
        });

     }

    connectAndListen(companyId: string, broker: string, topicos: string[]) {
        const client = mqtt.connect(broker);

        client.on('connect', () => {
            console.log(`Conectado ao broker ${broker}`);
        });
        client.on('reconnect', () => {
            console.log(`Tentando reconectar ao broker ${broker}`);
        });

        client.on('close', () => {
            console.log(`Conexão fechada com o broker ${broker}`);
        });

        for( let topico of topicos ) { client.subscribe(topico) }

        client.on('message', async (topic, message) => {
            console.log(`Mensagem recebida para a empresa ${companyId} no tópico ${topic}:`, message.toString());

            if(topic){
    
                try {
        
                    const novoValorEntity = new ValuesDevicesEntity();
                    novoValorEntity.id = uuid();
                    novoValorEntity.peso = parseFloat(message.toString()) ;
            
                    await this.valueDeviceServices.save(novoValorEntity);
    
                    if(message.toString()){
    
                        const device = await this.devicesServices.findTopico(topic);
    
                        device.values.push(novoValorEntity);
    
                        await this.devicesServices.save(device);
    
                    }else{
    
                    }
    
                } catch (error) {
                    console.log(message.toString());
                }
          }
        });
        this.mqttClients[companyId] = client;  // Armazena o cliente MQTT para a empresa
    }
    connectToNewBroker(companyId: string, broker: string, topicos: string[]) {
        this.connectAndListen(companyId, broker, topicos);
    }

    getMqttClients(): any{
        return this.mqttClients;
    }
    removeClient(id: string){
        if (this.mqttClients.hasOwnProperty(id)) {
            delete this.mqttClients[id]; // Isso remove o cliente MQTT com base no companyId
            console.log(`Cliente MQTT removido para a empresa ${id}`);
            return true;
        } else {
            console.log(`Cliente MQTT não encontrado para a empresa ${id}`);
            return false;
        }
    }
}

