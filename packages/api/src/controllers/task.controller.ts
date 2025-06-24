import {Body, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {TaskService} from '../services/task.service';
import {
    CreateTaskSchema,
    TaskFilterSchema,
    UpdateTaskSchema,
    type CreateTaskDto,
    type TaskFilterDto,
    type UpdateTaskDto
} from '../dtos/task.dto';
import {type Static, Type} from '@sinclair/typebox';
import {Validate} from 'nestjs-typebox';
import {AuthenticatedController} from "utils/controller.decorator";

const StatusEnum = Type.Union([
    Type.Literal('todo'),
    Type.Literal('in_progress'),
    Type.Literal('done'),
]);

const PriorityEnum = Type.Union([
    Type.Literal('low'),
    Type.Literal('medium'),
    Type.Literal('high'),
]);

const ResponseSchema = Type.Object({
    id: Type.Number(),
    title: Type.String(),
    description: Type.Union([Type.String(), Type.Null()]),
    status: StatusEnum,
    priority: PriorityEnum,
    projectId: Type.Number()
})

type ResponseDto = Static<typeof ResponseSchema>;

@AuthenticatedController('/tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {
    }

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
