import { Module } from "@nestjs/common";
import { UserModule } from "src/users/users.module";
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from "./constants";
import { AuthService } from "./authentication.services";
import { UserServices } from "src/users/users.services";
import { AuthController } from "./authentication.controller";
import { UserEntity } from "src/users/users.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthGuard } from "./authentication.guard";
import { APP_GUARD } from "@nestjs/core";
@Module({
    imports: [
        UserModule,
        TypeOrmModule.forFeature([UserEntity]),
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s'}
        })
    ],
    providers: [AuthService, UserServices],
    controllers: [AuthController],
    exports: [AuthService, UserServices]
})
export class AuthModule {}