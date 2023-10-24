import { plainToInstance } from "class-transformer";
import { IsString, IsNotEmpty, validateSync } from "class-validator";

class Env {

    @IsString()
    @IsNotEmpty()
    readonly dbURL: string;

    @IsString()
    @IsNotEmpty()
    readonly jwtSecret: string;

}

export const env: Env = plainToInstance(Env,{
    dbURL: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET
});


const errors = validateSync(env);

if( errors.length > 0 ){

    throw new Error(JSON.stringify(errors,null,2));

}