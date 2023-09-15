import { DevicesEntity } from "src/devices/devices.entity";
import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, OneToMany, Column, ManyToMany, JoinTable, CreateDateColumn } from "typeorm";

@Entity({name: "values_devices"})
export class ValuesDevicesEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: "peso", nullable: true})
    peso?: number;

    @ManyToOne(() => DevicesEntity, device => device.values, { onDelete: "CASCADE"})
    device?: DevicesEntity;

    @CreateDateColumn({name: "created_at"})
    created_at?: string;
}