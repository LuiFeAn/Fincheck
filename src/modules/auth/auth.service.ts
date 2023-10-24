import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDTO } from './dtos/signin-dto';
import { UsersRepository } from 'src/shared/database/repositories/users-repository';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDTO } from './dtos/signup-dto';
import { ConflictException } from '@nestjs/common';

@Injectable()
export class AuthService {

    constructor( private readonly usersRepository: UsersRepository, private readonly jwtService: JwtService ){}

    async siginIn(siginIn: SignInDTO){

        const { email, password } = siginIn;

        const user = await this.usersRepository.findByEmail(email);

        if( !user ){

            throw new UnauthorizedException('Invalid credentials');

        }

        const passwordValidation = await compare(password, user.password);

        if( !passwordValidation ){

            throw new UnauthorizedException('Invalid credentials');

        }

        const acessToken = this.generateAcessToken(user.id);

        return acessToken

    }

    private generateAcessToken(userId: string){

        return this.jwtService.signAsync({
            sub: userId
        });

    }

    async signUp(signUpDTO: SignUpDTO){

        const { email, password } = signUpDTO;
        
        const emailTaken = await this.usersRepository.findByEmail(email);
    
        if( emailTaken ){
    
            throw new ConflictException('This email is already in use')
    
        }
    
        const hashedPassword = await hash(password,12);
    
        signUpDTO.password = hashedPassword;
    
        const createdUser = await this.usersRepository.create({
            data: {
            ...signUpDTO,
            categories:{
                createMany:{
                data:[ 
                { name: 'Salário', icon: 'salary', type: 'INCOME' },
                { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
                { name: 'Outro', icon: 'other', type: 'INCOME' },
                { name: 'Casa', icon: 'home', type: 'EXPENSE' },
                { name: 'Alimentação', icon: 'food', type: 'EXPENSE' },
                { name: 'Educação', icon: 'education', type: 'EXPENSE' },
                { name: 'Lazer', icon: 'fun', type: 'EXPENSE' },
                { name: 'Mercado', icon: 'grocery', type: 'EXPENSE' },
                { name: 'Roupas', icon: 'clothes', type: 'EXPENSE' },
                { name: 'Transporte', icon: 'transport', type: 'EXPENSE' },
                { name: 'Viagem', icon: 'travel', type: 'EXPENSE' },
                { name: 'Outro', icon: 'other', type: 'EXPENSE' },]
                }
            }
            },
        });
    
        const acessToken = this.generateAcessToken(createdUser.id);

        return acessToken;

    }

}
