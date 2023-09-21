import { CompaniesEntity } from "src/companies/companies.entity";
import { DevicesEntity } from "src/devices/devices.entity";
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, OneToMany } from "typeorm";

@Entity({name: "users"})
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: "first_name", length: 255, nullable: false})
    first_name?: string;

    @Column({name: "last_name", length: 255, nullable: true})
    last_name?: string;

    @Column({name: "email", length: 255, nullable: false})
    email?: string;

    @Column({name: "username", length: 255, nullable: false})
    username?: string;

    @Column({name: "password", length: 255, nullable: false})
    password?: string;

    @Column({name: "isAdmin", default: false})
    isAdmin?: boolean;

    @ManyToOne(() => CompaniesEntity, company => company.users)
    company?: CompaniesEntity;

    @CreateDateColumn({name: "created_at"})
    created_at?: string;
}