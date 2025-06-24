import { Module } from '@nestjs/common';
import { TaskController } from '../controllers/task.controller';
import { TaskService } from '../services/task.service';
import { TaskRepository } from '../repositories/task.repository';
import { DatabaseModule } from '../db/db';
import { AuthModule } from './auth.module';
import { ProjectModule } from './project.module';

@Module({
  imports: [DatabaseModule, AuthModule, ProjectModule],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
  exports: [TaskService],
})
export class TaskModule {} 