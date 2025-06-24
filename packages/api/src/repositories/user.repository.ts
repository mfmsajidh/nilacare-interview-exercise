import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import {type DB, DRIZZLE} from '../db/db';
import { users } from '../db/schemas/user.schema';
import type { NewUser } from '../db/schemas/user.schema';

@Injectable()
export class UserRepository {
  constructor(@Inject(DRIZZLE) private readonly db: DB) {}

  async create(data: NewUser) {
    const [user] = await this.db.insert(users).values(data).returning();
    return user;
  }

  async findByEmail(email: string) {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email));
    return user || null;
  }

  async findById(id: number) {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.id, id));
    return user || null;
  }
}
