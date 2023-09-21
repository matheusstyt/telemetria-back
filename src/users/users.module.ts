import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserServices } from "./users.services";
import { UserController } from "./users.controller";
import { UserEntity } from "./users.entity";
import { CompaniesEntity } from "src/companies/companies.entity";
import { CompaniesServices } from "src/companies/companies.services";
@Module({
    imports: [TypeOrmModule.forFeature([CompaniesEntity, UserEntity])],
    controllers: [UserController],
    providers: [ CompaniesServices,  UserServices ]
})
export class UserModule {};