import { Injectable, Inject } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import {type DB, DRIZZLE} from 'db/db.ts';
import { tasks } from 'db/schemas';
import type { CreateTaskDto, TaskFilterDto, UpdateTaskDto } from './dto';

@Injectable()
export class TaskRepository {
  constructor(@Inject(DRIZZLE) private readonly db: DB) {}

  async create(data: CreateTaskDto) {
    const [task] = await this.db.insert(tasks).values(data).returning();
    return task;
  }

  async findAll(filter?: TaskFilterDto) {
    const conditions = [];

    if (filter?.status) {
      conditions.push(eq(tasks.status, filter.status));
    }

    if (filter?.priority) {
      conditions.push(eq(tasks.priority, filter.priority));
    }

    if (filter?.projectId) {
      conditions.push(eq(tasks.projectId, filter.projectId));
    }

    return this.db
      .select()
      .from(tasks)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(tasks.createdAt);
  }

  async findById(id: number) {
    const [task] = await this.db
      .select()
      .from(tasks)
      .where(eq(tasks.id, id));
    return task || null;
  }

  async update(id: number, data: UpdateTaskDto) {
    const [task] = await this.db
      .update(tasks)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(tasks.id, id))
      .returning();
    return task || null;
  }

  async delete(id: number) {
    const [task] = await this.db
      .delete(tasks)
      .where(eq(tasks.id, id))
      .returning();
    return task || null;
  }

  async findByProjectId(projectId: number) {
    return this.db
      .select()
      .from(tasks)
      .where(eq(tasks.projectId, projectId))
      .orderBy(tasks.createdAt);
  }
}
