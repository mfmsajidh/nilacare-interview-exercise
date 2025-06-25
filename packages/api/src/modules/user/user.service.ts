import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import {createSigner} from "fast-jwt";

@Injectable()
export class UserService {
  private readonly secret: string;
  private readonly expiresIn: string;
  private readonly signer: ReturnType<typeof createSigner>;

  constructor(
    private readonly userRepository: UserRepository,
  ) {
    this.secret = process.env.JWT_SECRET || 'super-secret';
    this.expiresIn = '7d';
    this.signer = createSigner({ key: async () => this.secret });
  }


  private async sign(payload: Record<string, any>): Promise<string> {
    return this.signer({ ...payload, exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60 });
  }

  async register(email: string, password: string) {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userRepository.create({
      email,
      password: hashedPassword,
    });

    const token = await this.sign({ userId: user.id });
    return { user, token };
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.sign({ userId: user.id });
    return { user, token };
  }

  async validateUser(userId: number) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}
