import { IsString, IsNotEmpty, IsEmail, MinLength } from "class-validator"

export class SignInDTO {

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string

}
