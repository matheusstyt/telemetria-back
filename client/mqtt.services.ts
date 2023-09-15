import { ValueDeviceServices } from "src/valuesDevices/valuesDevices.services";
import { ValuesDevicesEntity } from "src/valuesDevices/valuesDevices.entity";
import { CompaniesServices } from "src/companies/companies.services";
import { DeviceServices } from "src/devices/devices.services";
import { Injectable } from "@nestjs/common";
import { v4 as uuid } from "uuid";
import { ICompany } from "./dto";
const mqtt = require('mqtt'); 

@Injectable()
export class MqttService {

    private companies: ICompany[] = [];

    private mqttClients: { [companyId: string]: ICompany } = {};  // Armazena os clientes MQTT por empresa

    constructor( 

        private valueDeviceServices: ValueDeviceServices,
        private devicesServices: DeviceServices,
        private companiesServices: CompaniesServices

    ) { this.checkUpdatedCompanies() }

     async checkUpdatedCompanies() {
        await this.companiesServices.list()
        .then(async (companies: ICompany[]) => {
            for (const company of companies) {
                if (!this.mqttClients[company.id]) {
                    await this.connectAndListen(company.id, company.broker, company.topicos);
                }
            };
        });
         this.listenToCompanyBrokers();
     }
     getListBroker() {
         return this.getCompanies();
        }
    
        async listenToCompanyBrokers() {
            const companies = this.getCompanies();
            for (const company of companies) {
                await this.connectAndListen(company.id, company.broker, company.topicos);
            }
    }

    connectAndListen(companyId: string, broker: string, topicos: string[]) {
        const client = mqtt.connect(broker);

        client.on('connect', () => {
            console.log(`Cliente MQTT conectado para a empresa ${broker}`);
        });
        client.on('disconnect', () => {
            console.log(`Cliente MQTT disconectado para a empresa ${broker}`)
        })
        for( let topico of topicos ) { client.subscribe(topico) }

        client.on('message', async (topic, message) => {
            console.log(`Mensagem recebida para a empresa ${companyId} no tópico ${topic}:`, message.toString());
          //  console.log(this.mqttClients)
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

    getCompanies(): ICompany[] {
        return this.companies;
    }

    setCompany(company: ICompany): void {
        this.companies.push(company);
    }

}

