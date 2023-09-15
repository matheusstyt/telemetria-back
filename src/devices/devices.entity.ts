
import { CompaniesEntity } from "src/companies/companies.entity";
import { ValuesDevicesEntity } from "src/valuesDevices/valuesDevices.entity";
import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, OneToMany, Column } from "typeorm";

@Entity({name: "devices"})
export class DevicesEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: "descricao", length: 255, nullable: false})
    descricao?: string;

    @Column({name: "topico", length: 255, nullable: true})
    topico?: string;

    @OneToMany(() => ValuesDevicesEntity, values => values.device, {eager: true, cascade: true, nullable: true, onDelete: "CASCADE"})
    values?: ValuesDevicesEntity[];

    @ManyToOne(() => CompaniesEntity, company => company.devices, {
    onDelete: 'CASCADE',
    })
    company: CompaniesEntity;
}