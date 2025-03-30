import { v4 as uuid } from 'uuid'
import { IsOptional, IsString, IsNotEmpty, IsInt, IsPositive, Length, Min, Max } from "class-validator"

export class VehicleDTO {
    id: string = uuid()

    @IsString({ groups: ['create'] })
    @IsOptional({ groups: ['update'] })
    @IsNotEmpty({ message: 'Placa deve ser informada', groups: ['create'] })
    @Length(7, 7, { message: 'Placa deve ter exatamente 7 caracteres.', groups: ['create'] })
	placa!: string

    @IsString({ groups: ['create'] })
    @IsOptional({ groups: ['update'] })
    @IsNotEmpty({ message: 'Número do Chassi deve ser informado', groups: ['create'] })
    @Length(17, 17, { message: 'Chassi deve ter exatamente 17 caracteres.', groups: ['create'] })
	chassi!: string

    @IsString({ groups: ['create'] })
    @IsOptional({ groups: ['update'] })
    @IsNotEmpty({ message: 'Número do Renavan deve ser informado', groups: ['create'] })
    @Length(11, 11, { message: 'Renavam deve ter exatamente 11 caracteres.', groups: ['create'] })
	renavam!: string

    @IsString({ groups: ['create'] })
    @IsOptional({ groups: ['update'] })
    @IsNotEmpty({ message: 'Modelo do carro deve ser informado', groups: ['create'] })
    @Length(3, 30, { message: 'Modelo deve ter entre 3 e 30 caracteres.', groups: ['create'] })
	modelo!: string

    @IsString({ groups: ['create'] })
    @IsOptional({ groups: ['update'] })
    @IsNotEmpty({ message: 'Marca do carro deve ser informado', groups: ['create'] })
    @Length(3, 10, { message: 'Marca deve ter entre 3 e 10 caracteres.', groups: ['create'] })
	marca!: string

    @IsOptional({ groups: ['update'] })
    @IsInt({ message: 'O ano deve ser um número inteiro.', groups: ['create'] })
    @IsPositive({ message: 'O ano deve ser um número positivo.', groups: ['create'] })
    @Min(2000, { message: 'O ano deve ser maior ou igual a 2000.', groups: ['create'] })
    @Max(new Date().getFullYear(), { message: 'O ano não pode ser maior que o ano atual.', groups: ['create'] })
    ano!: number
}
