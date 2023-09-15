import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";
import { DevicesEntity } from "src/devices/devices.entity";

export class ValueDevicesDTO {

    @IsNotEmpty({ message: "Peso não pode ser vazio!" })
    @IsNumber()
    peso?: number;

    @IsOptional()
    @IsString({ message: "A descrição do dispositivo deve ser string." })
    descricao?: string;

    @IsOptional()
    @IsString({ message: "O ID do dispisitivo deve ser string." })
    fk_device: string;

}