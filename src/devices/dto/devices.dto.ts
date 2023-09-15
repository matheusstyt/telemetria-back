import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class DevicesDTO {

    @IsNotEmpty({ message: " O tópico não pode ser vazio!" })
    @IsString()
    topico?: string;

    @IsOptional()
    @IsString({ message: "A descrição do dispositivo deve ser string." })
    descricao?: string;

    @IsOptional()
    @IsString({ message: "O ID da empresa deve ser string." })
    fk_company: string
}