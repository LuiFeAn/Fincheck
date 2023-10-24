import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dtos/signin-dto';
import { UsersService } from '../users/users.service';
import { SignUpDTO } from './dtos/signup-dto';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  siginIn(@Body() signInDTO: SignInDTO){

    return this.authService.siginIn(signInDTO)

  }

  @Post('signup')
  siginUp(@Body() signUpDTO: SignUpDTO) {

    return this.authService.signUp(signUpDTO);

  }


}
