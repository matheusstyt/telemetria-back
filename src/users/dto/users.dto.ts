import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { CompaniesEntity } from "src/companies/companies.entity";

export class UserDTO {

    @IsNotEmpty({ message: "O primeiro nome não pode ser vazio!" })
    @IsString({ message: "O primeiro nome ser string." })
    first_name: string;

    @IsOptional()
    @IsString({ message: "O ultimo nome ser string." })
    last_name?: string;

    @IsNotEmpty({ message: "O email não pode ser vazio!" })
    @IsEmail()
    email: string;

    @IsNotEmpty({ message: "O nome de usuário não pode ser vazio!" })
    @IsString({ message: "O nome de usuário deve ser string." })
    username: string;

    @MinLength(8)
    @IsNotEmpty({ message: "A senha não pode ser vazio!" })
    @IsString({ message: "A senha deve ser string." })
    password: string;

    @IsOptional()
    @IsBoolean()
    isAdmin:boolean;

    @IsOptional()
    @IsString({ message: "A matrícula da empresa deve ser string." })
    matricula_company?: string;
}
export class UpdateUserDTO {

    @IsOptional()
    @IsString({ message: "O primeiro nome ser string." })
    first_name?: string;

    @IsOptional()
    @IsString({ message: "O ultimo nome ser string." })
    last_name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString({ message: "O nome de usuário deve ser string." })
    username?: string;

    @MinLength(8)
    @IsOptional()
    @IsString({ message: "A senha deve ser string." })
    password?: string;

    @IsOptional()
    @IsBoolean()
    isAdmin?:boolean;

    @IsOptional()
    @IsString({ message: "A matrícula da empresa deve ser string." })
    matricula_company?: string;
}

export class UserGetOneDTO {

    first_name?: string;

    last_name?: string;

    email?: string;

    username?: string;

    isAdmin?:boolean;

    company?: CompaniesEntity;
}

export class ListUsersDTO {
    constructor (
        readonly id: string,
        readonly first_name: string,
        readonly last_name: string,
        readonly email: string,
        readonly username: string,
        readonly company: CompaniesEntity,
        readonly isAdmin: boolean
    ) {}
}