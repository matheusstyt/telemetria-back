import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { DevicesEntity } from "src/devices/devices.entity";

export class CompaniesDTO {

    @IsNotEmpty({ message: "Peso não pode ser vazio!" })
    @IsString()
    url?: string;

    @IsOptional()
    @IsString({ message: "A descrição do dispositivo deve ser string." })
    descricao?: string;

}
export class UpdateCompaniesDTO {

    @IsNotEmpty({ message: "Peso não pode ser vazio!" })
    @IsString()
    url?: string;

    @IsOptional()
    @IsString({ message: "A descrição do dispositivo deve ser string." })
    descricao?: string;
}

export class ListCompaniesDTO{
    constructor(
        readonly id: string, 
        readonly url: string,
    ) {}
}