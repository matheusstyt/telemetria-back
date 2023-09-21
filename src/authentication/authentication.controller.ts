
import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './authentication.services';
import { Public } from './constants';

@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() signInDto: Record<string, any>) {
        return this.authService.login(signInDto.username, signInDto.password);
    }
}