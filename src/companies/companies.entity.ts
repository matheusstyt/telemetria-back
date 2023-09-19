
import { DevicesEntity } from "src/devices/devices.entity";
import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, OneToMany, Column } from "typeorm";

@Entity({name: "companies"})
export class CompaniesEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: "descricao", length: 255, nullable: false})
    descricao?: string;

    @Column({name: "url", length: 255, nullable: true})
    url?: string;

    // @Column({name: "status", default: false})
    // status?: boolean;

    @OneToMany(() => DevicesEntity, device => device.company, {
        eager: true,
        cascade: true,
        onDelete: 'CASCADE',
      })
      devices: DevicesEntity[];
}