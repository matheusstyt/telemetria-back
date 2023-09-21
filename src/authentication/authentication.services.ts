import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserGetOneDTO } from "src/users/dto/users.dto";
import { UserServices } from "src/users/users.services";

@Injectable()
export class AuthService {
    constructor(
        private usesServices: UserServices, private jwtService: JwtService
    ) {}

    async login(username, password) {

        console.log("username", username, "password", password);
        
        const user = await this.usesServices.findUserName(username);
        
        console.log("user", user);
        
        if( user.password !== password) throw new UnauthorizedException();

        const payload = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            username: user.username,
            isAdmin: user.isAdmin,
            company: user.company
        }

        return { 
            acess_token: await this.jwtService.signAsync(payload),
            data: payload
        };
    }
}