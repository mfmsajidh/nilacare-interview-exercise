import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { ProjectRepository } from './project.repository';
import { DatabaseModule } from 'db/db';
import {UserModule} from "modules/user";

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectRepository],
  exports: [ProjectService],
})

export class ProjectModule {}
