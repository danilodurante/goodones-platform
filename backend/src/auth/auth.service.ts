import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Supportiamo sia snake_case che camelCase, per sicurezza
    const anyUser = user as any;
    const passwordHash =
      (anyUser.password_hash as string | undefined) ??
      (anyUser.passwordHash as string | undefined);

    // Log di debug per capire cosa sta arrivando
    console.log('DEBUG AuthService.validateUser user:', {
      id: user.id,
      email: user.email,
      hasPasswordHash: !!passwordHash,
      rawPasswordHash: passwordHash,
      keys: Object.keys(anyUser),
    });

    // Se non abbiamo un hash valido, non chiamiamo bcrypt
    if (!passwordHash) {
      console.error('User found but has no password hash, denying login', {
        id: user.id,
        email: user.email,
      });
      throw new UnauthorizedException('Invalid credentials');
    }

    const match = await bcrypt.compare(password, passwordHash);

    if (!match) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async login(user: User) {
    const anyUser = user as any;
    const payload = { sub: user.id, email: user.email, role: anyUser.role };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        role: anyUser.role,
      },
    };
  }
}
