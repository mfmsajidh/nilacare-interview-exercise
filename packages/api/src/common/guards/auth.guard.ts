import {type CanActivate, type ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {createDecoder} from 'fast-jwt';
import type {FastifyRequest} from 'fastify';
import {Reflector} from '@nestjs/core';
import {IS_PUBLIC_KEY} from "../decorators";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());

		if (isPublic) {
			return true;
		}

		const request = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader(request);

		if (!token) {
			throw new UnauthorizedException();
		}

		try {
			const payload = await createDecoder()(token);
			request['user'] = payload;
		} catch {
			throw new UnauthorizedException();
		}
		return true;
	}

	private extractTokenFromHeader(request: FastifyRequest): string | undefined {
		const [type, token] = request.headers.authorization?.split(' ') ?? [];
		return type === 'Bearer' ? token : undefined;
	}
}
