import { Module } from '@nestjs/common';
import { ProjectController } from '../controllers/project.controller';
import { ProjectService } from '../services/project.service';
import { ProjectRepository } from '../repositories/project.repository';
import { DatabaseModule } from '../db/db';
import { AuthModule } from './auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectRepository],
  exports: [ProjectService],
})
export class ProjectModule {}
