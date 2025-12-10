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
      // Nessun utente con quella email
      throw new UnauthorizedException('Invalid credentials');
    }

    // Supportiamo sia `passwordHash` che `password_hash`
    const hash =
      (user as any).passwordHash ??
      (user as any).password_hash ??
      null;

    // Se per qualche motivo non c'è hash, non proviamo nemmeno a fare il compare
    if (!hash || typeof hash !== 'string') {
      console.error('User has no password hash set', {
        id: (user as any).id,
        email: (user as any).email,
      });
      throw new UnauthorizedException('Invalid credentials');
    }

    const match = await bcrypt.compare(password, hash);

    if (!match) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async login(user: User) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }
}
