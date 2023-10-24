import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service';
import { type Prisma } from '@prisma/client';

@Injectable()
export class UsersRepository {

    constructor(private readonly prismaService: PrismaService){}

    create(createDto: Prisma.UserCreateArgs){

        return this.prismaService.user.create(createDto);

    }

    findUnique(options: Prisma.UserFindUniqueArgs){

        return this.prismaService.user.findUnique(options);

    }

    findByEmail(email: string){

        return this.prismaService.user.findUnique({
            where:{
                email,
            },
        })

    }

}