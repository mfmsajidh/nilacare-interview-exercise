import {Module} from '@nestjs/common';
import {AuthController} from '../controllers/auth.controller';
import {AuthService} from '../services/auth.service';
import {DatabaseModule} from '../db/db';
import {UserRepository} from '../repositories/user.repository';
import {JwtService} from '../services/jwt.service';
import {AuthGuard} from '../utils/auth.guard';

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
