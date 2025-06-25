import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {DatabaseModule} from 'db/db';
import {UserRepository} from './user.repository';
import {JwtService} from './jwt.service';
import {AuthGuard} from "common/guards";

@Module({
    imports: [DatabaseModule],
    controllers: [AuthController],
    providers: [
        AuthService,
        UserRepository,
        JwtService,
        AuthGuard
    ],
    exports: [AuthService],
})
export class AuthModule {
}
