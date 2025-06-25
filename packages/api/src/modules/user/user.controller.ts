import { Body, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Validate } from 'nestjs-typebox';
import {NoAuthController} from "common/decorators";
import {type RequestDto, RequestSchema, type ResponseDto, ResponseSchema} from "./dto";

@NoAuthController('/user')
export class UserController {
  constructor(private readonly authService: UserService) {}

  @Post('register')
  @Validate({
    request: [
      { type: 'body', schema: RequestSchema }
    ],
    response: ResponseSchema
  })
  register(@Body() data: RequestDto): Promise<ResponseDto> {
    return this.authService.register(data.email, data.password);
  }

  @Post('login')
  @Validate({
    request: [
      { type: 'body', schema: RequestSchema }
    ],
    response: ResponseSchema
  })
  async login(@Body() data: RequestDto): Promise<ResponseDto> {
    return this.authService.login(data.email, data.password);
  }
}
