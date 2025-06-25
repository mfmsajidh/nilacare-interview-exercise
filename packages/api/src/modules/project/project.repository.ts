import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import {type DB, DRIZZLE} from 'db/db.ts';
import { projects } from 'db/schemas';
import type { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectRepository {
  constructor(@Inject(DRIZZLE) private readonly db: DB) {}

  async create(data: CreateProjectDto) {
    const [project] = await this.db.insert(projects).values(data).returning();
    return project;
  }

  async findAll() {
    return this.db.select().from(projects);
  }

  async findById(id: number) {
    const [project] = await this.db
      .select()
      .from(projects)
      .where(eq(projects.id, id));
    return project || null;
  }

  async update(id: number, data: UpdateProjectDto) {
    const [project] = await this.db
      .update(projects)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(projects.id, id))
      .returning();
    return project || null;
  }

  async delete(id: number) {
    const [project] = await this.db
      .delete(projects)
      .where(eq(projects.id, id))
      .returning();
    return project || null;
  }
}
