import {Module} from '@nestjs/common';
import {UserController} from './user.controller';
import {UserService} from './user.service';
import {DatabaseModule} from 'db/db';
import {UserRepository} from './user.repository';
import {AuthGuard} from "common/guards";

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [
        UserService,
        UserRepository,
        AuthGuard
    ]
})

export class UserModule {}
