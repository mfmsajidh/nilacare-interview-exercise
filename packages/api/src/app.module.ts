import {Module} from '@nestjs/common';
import {LoggerModule} from 'nestjs-pino';
import {DatabaseModule} from './db/db';
import {loggerOptions} from './config';
import {ProjectModule, TaskModule, UserModule} from './modules';

@Module({
	imports: [
		DatabaseModule,
		LoggerModule.forRoot(loggerOptions),
		UserModule,
		ProjectModule,
		TaskModule,
	]
})

export class AppModule {}
