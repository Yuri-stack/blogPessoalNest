import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { Bcrypt } from './bcrypt/bcrypt'
import { UserModule } from '../users/user.module'
import { PassportModule } from '@nestjs/passport'
import { jwtConstants } from './constants/constant'
import { AuthService } from './services/auth.service'
import { LocalStrategy } from './strategy/local.strategy'
import { JwtStrategy } from './strategy/jwt.strategy'
import { AuthController } from './controllers/auth.controller'

@Module({
    imports: [
        UserModule, 
        PassportModule, 
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '24h' }
        })
    ],
    providers: [Bcrypt, AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
    exports: [Bcrypt]
})

export class AuthModule { }