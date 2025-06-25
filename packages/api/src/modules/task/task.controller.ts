import {Body, Delete, Get, Param, Post, Put, Query, ParseIntPipe} from '@nestjs/common';
import {TaskService} from './task.service';
import {
    CreateTaskSchema,
    UpdateTaskSchema,
    type CreateTaskDto,
    type TaskFilterDto,
    type UpdateTaskDto,
    type ResponseDto,
    ResponseSchema,
    TaskPriorityEnum,
    TaskStatusEnum,
    type TaskStatusEnumDto,
    type TaskPriorityEnumDto
} from './dto';
import {Type} from '@sinclair/typebox';
import {Validate} from 'nestjs-typebox';
import {AuthenticatedController} from "common/decorators";

@AuthenticatedController('/tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post()
    @Validate({
        request: [
            {type: 'body', schema: CreateTaskSchema}
        ],
        response: ResponseSchema
    })
    createTask(@Body() data: CreateTaskDto): Promise<ResponseDto> {
        return this.taskService.createTask(data);
    }

    @Get()
    @Validate({
        request: [
            {
                name: 'projectId',
                type: 'query',
                schema: Type.Optional(Type.Number()),
                coerceTypes: true
            },
            {
                name: 'status',
                type: 'query',
                schema: Type.Optional(TaskStatusEnum)
            },
            {
                name: 'priority',
                type: 'query',
                schema: Type.Optional(TaskPriorityEnum)
            }
        ],
        response: Type.Array(ResponseSchema)
    })
    searchTasks(
        @Query('projectId') projectId?: number,
        @Query('status') status?: TaskStatusEnumDto,
        @Query('priority') priority?: TaskPriorityEnumDto,
    ): Promise<ResponseDto[]> {
        const filter: TaskFilterDto = {
            ...(projectId && { projectId }),
            ...(status && { status }),
            ...(priority && { priority })
        };
        return this.taskService.getAllTasks(filter);
    }

    @Get(':id')
    @Validate({
        request: [
            {name: 'id', type: 'param', schema: Type.Number(), coerceTypes: true}
        ],
        response: ResponseSchema
    })
    getTaskById(@Param('id') id: number): Promise<ResponseDto> {
        return this.taskService.getTaskById(id);
    }

    @Put(':id')
    @Validate({
        request: [
            {name: 'id', type: 'param', schema: Type.Number(), coerceTypes: true},
            {type: 'body', schema: UpdateTaskSchema}
        ],
        response: ResponseSchema
    })
    updateTask(@Param('id') id: number, @Body() data: UpdateTaskDto): Promise<ResponseDto> {
        return this.taskService.updateTask(id, data);
    }

    @Delete(':id')
    @Validate({
        request: [
            {name: 'id', type: 'param', schema: Type.Number(), coerceTypes: true}
        ],
        response: ResponseSchema
    })
    deleteTask(@Param('id') id: number): Promise<ResponseDto> {
        return this.taskService.deleteTask(id);
    }
}
