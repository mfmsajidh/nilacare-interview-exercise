import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import type { CreateTaskDto, TaskFilterDto, UpdateTaskDto } from './dto/task.dto';
import { ProjectService } from '../project/project.service';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly projectService: ProjectService,
  ) {}

  async createTask(data: CreateTaskDto) {
    await this.projectService.getProjectById(data.projectId);
    return this.taskRepository.create(data);
  }

  async getAllTasks(filter?: TaskFilterDto) {
    return this.taskRepository.findAll(filter);
  }

  async getTaskById(id: number) {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async updateTask(id: number, data: UpdateTaskDto) {
    const task = await this.taskRepository.update(id, data);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async deleteTask(id: number) {
    const task = await this.taskRepository.delete(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async getTasksByProjectId(projectId: number) {
    // Verify project exists
    await this.projectService.getProjectById(projectId);
    return this.taskRepository.findByProjectId(projectId);
  }
}
