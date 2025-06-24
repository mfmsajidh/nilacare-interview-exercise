import {Global, Module, type Provider} from '@nestjs/common';
import {drizzle} from 'drizzle-orm/node-postgres';
import * as schema from './schemas';

export const db = drizzle({
	schema,
	casing: 'snake_case',
	connection: process.env.DATABASE_URL!,
});

export const DRIZZLE = Symbol('DRIZZLE');

export type DB = typeof db;

const dbProvider: Provider = {
	provide: DRIZZLE,
	useValue: db,
};

@Global()
@Module({
	providers: [dbProvider],
	exports: [dbProvider],
})
export class DatabaseModule {}
