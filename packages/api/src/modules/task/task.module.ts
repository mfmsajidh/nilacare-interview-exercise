import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskRepository } from './task.repository';
import { DatabaseModule } from 'db/db';
import { UserModule } from '../user';
import { ProjectModule } from '../project';

@Module({
  imports: [DatabaseModule, UserModule, ProjectModule],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
  exports: [TaskService],
})

export class TaskModule {}
