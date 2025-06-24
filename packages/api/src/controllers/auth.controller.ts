import { Body, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import {type Static, Type} from '@sinclair/typebox';
import { Validate } from 'nestjs-typebox';
import {NoAuthController} from "utils/controller.decorator";

const RequestSchema = Type.Object({
  email: Type.String({
    format: 'email',
    examples: ['john.doe@example.com']
  }),
  password: Type.String({
    minLength: 6,
    description: 'Password must be at least 6 characters long',
    examples: ['securePassword123']
  }),
}, {
  examples: [{
    email: 'john.doe@example.com',
    password: 'securePassword123'
  }]
});

type RequestDto = Static<typeof RequestSchema>;

const ResponseSchema = Type.Object({
  user: Type.Object({
    id: Type.Number({
      examples: [1]
    }),
    email: Type.String({
      format: 'email',
      examples: ['john.doe@example.com']
    }),
  }),
  token: Type.String({
    description: 'JWT token for authentication',
    examples: ['eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...']
  }),
})

type ResponseDto = Static<typeof ResponseSchema>;

@NoAuthController('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
