import { applyDecorators, SetMetadata } from '@nestjs/common';
import type { TSchema } from '@sinclair/typebox';

interface TypeBoxRouteOptions {
  schema: {
    body?: TSchema;
    params?: TSchema;
    querystring?: TSchema;
    response?: {
      [key: number]: TSchema;
    };
  };
}

export const TYPEBOX_SCHEMA = 'typebox:schema';

export function TypeBoxRoute(options: TypeBoxRouteOptions) {
  return applyDecorators(
    SetMetadata(TYPEBOX_SCHEMA, options.schema)
  );
} 