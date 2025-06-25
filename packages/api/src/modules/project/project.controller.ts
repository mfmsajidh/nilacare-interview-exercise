import {Body, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ProjectService} from './project.service';
import {
    CreateProjectSchema,
    UpdateProjectSchema,
    type CreateProjectDto,
    type UpdateProjectDto,
    ResponseSchema,
    type ResponseDto
} from './dto';
import {Type} from '@sinclair/typebox';
import {Validate} from 'nestjs-typebox';
import {AuthenticatedController} from "common/decorators";

@AuthenticatedController('/projects')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @Post('/')
    @Validate({
        request: [
            {type: 'body', schema: CreateProjectSchema}
        ],
        response: ResponseSchema
    })
    createProject(
        @Body() data: CreateProjectDto
    ): Promise<ResponseDto> {
        return this.projectService.createProject(data);
    }

    @Get('/')
    @Validate({
        response: Type.Array(ResponseSchema),
    })
    getAllProjects(): Promise<ResponseDto[]> {
        return this.projectService.getAllProjects();
    }

    @Get(':id')
    @Validate({
        request: [
            {name: 'id', type: 'param', schema: Type.Number(), coerceTypes: true}
        ],
        response: ResponseSchema
    })
    getProjectById(
        @Param('id') id: number
    ): Promise<ResponseDto> {
        return this.projectService.getProjectById(id);
    }

    @Put(':id')
    @Validate({
        request: [
            {name: 'id', type: 'param', schema: Type.Number(), coerceTypes: true},
            {type: 'body', schema: UpdateProjectSchema}
        ],
        response: ResponseSchema
    })
    updateProject(
        @Param('id') id: number,
        @Body() data: UpdateProjectDto
    ): Promise<ResponseDto> {
        return this.projectService.updateProject(id, data);
    }

    @Delete(':id')
    @Validate({
        request: [
            {name: 'id', type: 'param', schema: Type.Number(), coerceTypes: true}
        ],
        response: ResponseSchema
    })
    async deleteProject(
        @Param('id') id: number
    ): Promise<ResponseDto> {
        return this.projectService.deleteProject(id);
    }
}
