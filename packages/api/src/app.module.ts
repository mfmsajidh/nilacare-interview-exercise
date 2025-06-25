import {Module} from '@nestjs/common';
import {LoggerModule} from 'nestjs-pino';
import {DatabaseModule} from './db/db';
import {loggerOptions} from './config';
import {ProjectModule} from './modules/project.module';
import {AuthModule} from './modules/auth.module';
import {TaskModule} from './modules/task.module';

@Module({
	imports: [
		DatabaseModule,
		LoggerModule.forRoot(loggerOptions),
		AuthModule,
		ProjectModule,
		TaskModule,
	],
	exports: [],
})
export class AppModule {
}
