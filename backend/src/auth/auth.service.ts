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

  /**
   * DEV / DEMO MODE:
   * ignora la password e restituisce sempre il demo user.
   */
  async validateUser(email: string, password: string): Promise<User> {
    // Per sicurezza stampiamo cosa arriva
    console.log('DEBUG validateUser input:', { email, password });

    // Forziamo SEMPRE la ricerca del demo user creato dal seed
    const user = await this.usersService.findByEmail('demo@goodones.ai');

    console.log('DEBUG validateUser user from DB:', {
      found: !!user,
      id: user?.id,
      email: user?.email,
    });

    if (!user) {
      // Se proprio non esiste in DB, allora sì, blocchiamo
      throw new UnauthorizedException('Demo user not found in database');
    }

    // ⚠️ NIENTE bcrypt.compare QUI
    // Ignoriamo la password e lasciamo passare sempre il demo user
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
