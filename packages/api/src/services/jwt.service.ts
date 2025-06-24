import { Injectable } from '@nestjs/common';
import { createSigner } from 'fast-jwt';

@Injectable()
export class JwtService {
  private readonly secret: string;
  private readonly expiresIn: string;
  private readonly signer: ReturnType<typeof createSigner>;

  constructor() {
    this.secret = process.env.JWT_SECRET || 'super-secret';
    this.expiresIn = '7d';
    this.signer = createSigner({ key: async () => this.secret });
  }

  async sign(payload: Record<string, any>): Promise<string> {
    return this.signer({ ...payload, exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60 });
  }
}
