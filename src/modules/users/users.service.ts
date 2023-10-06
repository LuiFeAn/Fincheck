import { ConflictException } from '@nestjs/common/exceptions';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from 'src/shared/database/repositories/users-repository';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(private readonly usersRepository: UsersRepository){}

  async create(createUserDto: CreateUserDto) {

    const { email, password } = createUserDto;

    const emailTaken = await this.usersRepository.findByEmail(email);

    if( emailTaken ){

        throw new ConflictException('This email is already in use')

    }

    const hashedPassword = await hash(password,12);

    createUserDto.password = hashedPassword;

    const createdUser = await this.usersRepository.create({
      data: {
        ...createUserDto,
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

    return createdUser;
    
  }

}
