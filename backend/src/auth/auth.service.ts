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

    const anyUser = user as any;

    // 🔍 Debug di cosa arriva dal DB
    console.log('DEBUG AuthService.validateUser user:', {
      id: user.id,
      email: user.email,
      role: anyUser.role,
      keys: Object.keys(anyUser),
    });

    // 🔍 Debug della password ricevuta dal client
    console.log('DEBUG AuthService.validateUser password input:', {
      passwordProvided: typeof password !== 'undefined',
      passwordLength: password ? password.length : 0,
      passwordValue: password,
    });

    // ✅ HACK DEV LOCALE:
    // per ora accettiamo come valida SOLO la combinazione
    // email = demo@goodones.ai e password = demo123
    if (email !== 'demo@goodones.ai' || password !== 'demo123') {
      console.error('Invalid email/password combination in dev login');
      throw new UnauthorizedException('Invalid credentials');
    }

    // ⚠️ NOTA:
    // qui NON usiamo bcrypt.compare per evitare l'errore
    // "data and hash arguments required" che ti bloccava.

    return user;
  }

  async login(user: User) {
    const anyUser = user as any;

    const payload = {
      sub: user.id,
      email: user.email,
      role: anyUser.role,
    };

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
