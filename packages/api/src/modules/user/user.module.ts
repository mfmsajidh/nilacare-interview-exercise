import {Module} from '@nestjs/common';
import {UserController} from './user.controller';
import {UserService} from './user.service';
import {DatabaseModule} from 'db/db';
import {UserRepository} from './user.repository';

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [
        UserService,
        UserRepository
    ]
})

export class UserModule {}
