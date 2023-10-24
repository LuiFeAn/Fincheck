import { IsString, IsNotEmpty, IsEmail, MinLength } from "class-validator"

export class SignUpDTO {

    @IsString()
    @IsNotEmpty()
    readonly name: string

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string

}
