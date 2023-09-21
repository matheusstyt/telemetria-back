
import { DevicesEntity } from "src/devices/devices.entity";
import { UserEntity } from "src/users/users.entity";
import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from "typeorm";

@Entity({name: "companies"})
export class CompaniesEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: "descricao", length: 255, nullable: false})
    descricao?: string;

    @Column({name: "url", length: 255, nullable: true})
    url?: string;

    @OneToMany(() => DevicesEntity, device => device.company, {
      eager: true,
      cascade: true,
      onDelete: 'CASCADE',
    })
    devices: DevicesEntity[];

    @OneToMany(() => UserEntity, user => user.company, {
      eager: false,
      cascade: true,
      onDelete: 'CASCADE',
    })
    users: UserEntity[];
}