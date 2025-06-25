import {Body, Delete, Get, Param, Post, Put, Query, ParseIntPipe} from '@nestjs/common';
import {TaskService} from './task.service';
import {
    CreateTaskSchema,
    TaskFilterSchema,
    UpdateTaskSchema,
    type CreateTaskDto,
    type TaskFilterDto,
    type UpdateTaskDto,
    type ResponseDto,
    ResponseSchema
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
            {name: 'filter', type: 'query', schema: TaskFilterSchema}
        ],
        response: Type.Array(ResponseSchema)
    })
    getAllTasks(@Query() filter: TaskFilterDto): Promise<ResponseDto[]> {
        return this.taskService.getAllTasks(filter);
    }

    @Get('search')
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
                schema: Type.Optional(Type.Union([
                    Type.Literal('todo'),
                    Type.Literal('in_progress'),
                    Type.Literal('done')
                ]))
            },
            {
                name: 'priority',
                type: 'query',
                schema: Type.Optional(Type.Union([
                    Type.Literal('low'),
                    Type.Literal('medium'),
                    Type.Literal('high')
                ]))
            }
        ],
        response: Type.Array(ResponseSchema)
    })
    searchTasks(
        @Query('projectId') projectId?: number,
        @Query('status') status?: 'todo' | 'in_progress' | 'done',
        @Query('priority') priority?: 'low' | 'medium' | 'high'
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
